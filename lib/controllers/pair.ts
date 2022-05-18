import Multicall from '@dopex-io/web3-multicall';
import { NextApiRequest, NextApiResponse } from 'next';
import { CONTRACTS } from '../../stores/constants/constants';
import { PairABI } from '../../stores/types/PairABI';
import { RouterABI } from '../../stores/types/RouterABI';
import { FactoryABI } from '../../stores/types/FactoryABI';
import { Erc20ABI } from '../../stores/types/Erc20ABI';
import { meterify } from '../sdks/meter';
import { bnToFixed } from '../../utils/utils';

import baseAssets from './baseAssets.json';

const multicall = new Multicall({
  multicallAddress: CONTRACTS.MULTICALL_ADDRESS,
  provider: meterify,
});

const pairsByIndex = new Map();

export class PairController {
  private static FactoryContract: FactoryABI = new meterify.eth.Contract(
    CONTRACTS.FACTORY_ABI,
    CONTRACTS.FACTORY_ADDRESS
  );

  private static RouterContract: RouterABI = new meterify.eth.Contract(
    CONTRACTS.ROUTER_ABI,
    CONTRACTS.ROUTER_ADDRESS
  );

  private static async getPairByIndex(index: number) {
    // cache
    if (pairsByIndex.has(index)) return pairsByIndex.get(index);

    const pair = await this.FactoryContract.methods.allPairs(index).call();

    const PairContract: PairABI = new meterify.eth.Contract(
      CONTRACTS.PAIR_ABI,
      pair
    );
    const [[token0, token1], symbol, decimals, isStable, totalSupply] =
      await multicall.aggregate([
        PairContract.methods.tokens(),
        PairContract.methods.symbol(),
        PairContract.methods.decimals(),
        PairContract.methods.stable(),
        PairContract.methods.totalSupply(),
      ]);

    const { 0: reserve0, 1: reserve1 } = await this.RouterContract.methods
      .getReserves(token0, token1, isStable)
      .call();

    const Token0Contract: Erc20ABI = new meterify.eth.Contract(
      CONTRACTS.ERC20_ABI,
      token0
    );
    const Token1Contract: Erc20ABI = new meterify.eth.Contract(
      CONTRACTS.ERC20_ABI,
      token1
    );

    const [
      token0Name,
      token0Symbol,
      token0Decimals,
      token1Name,
      token1Symbol,
      token1Decimals,
    ] = await multicall.aggregate([
      Token0Contract.methods.name(),
      Token0Contract.methods.symbol(),
      Token0Contract.methods.decimals(),
      Token1Contract.methods.name(),
      Token1Contract.methods.symbol(),
      Token1Contract.methods.decimals(),
    ]);

    const pairData = {
      id: index,
      address: pair,
      decimals,
      // gauge: { address: '0x029197408D8df390E0F086C784b4D66645639fDb' },
      isStable,
      reserve0: bnToFixed(reserve0, token0Decimals),
      reserve1: bnToFixed(reserve1, token1Decimals),
      symbol,
      token0: {
        name: token0Name,
        symbol: token0Symbol,
        address: token0,
        decimals: token0Decimals,
      },
      token1: {
        name: token1Name,
        symbol: token1Symbol,
        address: token1,
        decimals: token1Decimals,
      },
      totalSupply: bnToFixed(totalSupply, decimals),
    };

    return pairData;
  }

  public static async getPairs(req: NextApiRequest, res: NextApiResponse) {
    const allPairsLengh = Number.parseInt(
      await this.FactoryContract.methods.allPairsLength().call()
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
}
