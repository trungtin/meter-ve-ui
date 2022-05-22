import Multicall from '@dopex-io/web3-multicall';
import { NextApiRequest, NextApiResponse } from 'next';
import { CONTRACTS, ZERO_ADDRESS } from '../../stores/constants/constants';
import { PairABI } from '../../stores/types/PairABI';
import { RouterABI } from '../../stores/types/RouterABI';
import { FactoryABI } from '../../stores/types/FactoryABI';
import { VoterABI } from '../../stores/types/VoterABI';
import { BribeABI } from '../../stores/types/BribeABI';
import { Erc20ABI } from '../../stores/types/Erc20ABI';
import { meterify } from '../sdks/meter';
import { bnToFixed } from '../../utils/utils';

import { baseAssets, routeAssets } from './_assets';

const REWARD_TIME = 7 * 24 * 60 * 60;

const multicall = new Multicall({
  multicallAddress: CONTRACTS.MULTICALL_ADDRESS,
  provider: meterify,
});

const pairsByIndex = new Map();

const FactoryContract: FactoryABI = new meterify.eth.Contract(
  CONTRACTS.FACTORY_ABI,
  CONTRACTS.FACTORY_ADDRESS
);

const RouterContract: RouterABI = new meterify.eth.Contract(
  CONTRACTS.ROUTER_ABI,
  CONTRACTS.ROUTER_ADDRESS
);

const VoterContract: VoterABI = new meterify.eth.Contract(
  CONTRACTS.VOTER_ABI,
  CONTRACTS.VOTER_ADDRESS
);

async function getToken(address: string) {
  const TokenContract: Erc20ABI = new meterify.eth.Contract(
    CONTRACTS.ERC20_ABI,
    address
  );
  const [name, symbol, decimals, isWhitelisted] = await multicall.aggregate([
    TokenContract.methods.name(),
    TokenContract.methods.symbol(),
    TokenContract.methods.decimals(),
    VoterContract.methods.isWhitelisted(address),
  ]);

  return {
    address,
    name,
    symbol,
    decimals: Number.parseInt(decimals),
    isWhitelisted,
  };
}

async function getGauge(address: string) {
  if (!address || address === ZERO_ADDRESS) return null;
  const bribeAddr = await VoterContract.methods.bribes(address).call();

  const BribeContract: BribeABI = new meterify.eth.Contract(
    CONTRACTS.BRIBE_ABI,
    bribeAddr
  );

  const rewardListLength = await BribeContract.methods
    .rewardsListLength()
    .call();

  let rewardAddrs: string[] = [];

  if (rewardListLength && !Number.isNaN(Number.parseInt(rewardListLength))) {
    rewardAddrs = await multicall.aggregate(
      new Array(Number.parseInt(rewardListLength))
        .fill(null)
        .map((_, i) => BribeContract.methods.rewards(i))
    );
  }

  const rewardRates = await multicall.aggregate(
    rewardAddrs.map((addr) => BribeContract.methods.rewardRate(addr))
  );

  const rewards = await Promise.all(rewardAddrs.map((addr) => getToken(addr)));

  const bribes = rewardAddrs.map((addr, idx) => {
    const decimals = rewards[idx].decimals;
    return {
      token: rewards[idx],
      rewardRate: bnToFixed(rewardRates[idx], decimals),
      rewardAmount: bnToFixed(rewardRates[idx] * REWARD_TIME, decimals),
    };
  });

  return {
    address: address,
    bribeAddress: bribeAddr,
    bribes: bribes,
  };
}

export class PairController {
  private static async getPairByIndex(index: number) {
    // cache
    if (pairsByIndex.has(index)) return pairsByIndex.get(index);

    const pair = await FactoryContract.methods.allPairs(index).call();

    const PairContract: PairABI = new meterify.eth.Contract(
      CONTRACTS.PAIR_ABI,
      pair
    );

    const gaugeAddr = await VoterContract.methods.gauges(pair).call();

    const [[addr0, addr1], symbol, decimals, isStable, totalSupply] =
      await multicall.aggregate([
        PairContract.methods.tokens(),
        PairContract.methods.symbol(),
        PairContract.methods.decimals(),
        PairContract.methods.stable(),
        PairContract.methods.totalSupply(),
      ]);

    const { 0: reserve0, 1: reserve1 } = await RouterContract.methods
      .getReserves(addr0, addr1, isStable)
      .call();

    const [token0, token1] = await Promise.all(
      [addr0, addr1].map((addr) => getToken(addr))
    );

    const gauge = await getGauge(gaugeAddr);

    const pairData = {
      id: index,
      address: pair,
      decimals: Number.parseInt(decimals),
      gauge,
      gaugeAddress: gauge,
      isStable,
      reserve0: bnToFixed(reserve0, token0.decimals),
      reserve1: bnToFixed(reserve1, token1.decimals),
      symbol,
      token0,
      token1,
      totalSupply: bnToFixed(totalSupply, decimals),
    };

    return pairData;
  }

  public static async getPairs(req: NextApiRequest, res: NextApiResponse) {
    const allPairsLengh = Number.parseInt(
      await FactoryContract.methods.allPairsLength().call()
    );

    const queryPairsPromises: Promise<any>[] = [];

    for (let i = 0; i < allPairsLengh; i++) {
      const pair = this.getPairByIndex(i);
      queryPairsPromises.push(pair);
    }

    const data = await Promise.all(queryPairsPromises);

    res.status(200).json({ data });
  }

  public static async getBaseAssets(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ data: baseAssets });
  }

  public static async getRouteAssets(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.status(200).json({ data: routeAssets });
  }
}
