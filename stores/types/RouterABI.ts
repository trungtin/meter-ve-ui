/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface RouterABI extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): RouterABI;
  clone(): RouterABI;
  methods: {
    UNSAFE_swapExactTokensForTokens(
      amounts: (number | string | BN)[],
      routes: [string, string, boolean][],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    addLiquidity(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      amountADesired: number | string | BN,
      amountBDesired: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      liquidity: string;
      0: string;
      1: string;
      2: string;
    }>;

    addLiquidityMTR(
      token: string,
      stable: boolean,
      amountTokenDesired: number | string | BN,
      amountTokenMin: number | string | BN,
      amountMTRMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): PayableTransactionObject<{
      amountToken: string;
      amountMTR: string;
      liquidity: string;
      0: string;
      1: string;
      2: string;
    }>;

    factory(): NonPayableTransactionObject<string>;

    getAmountOut(
      amountIn: number | string | BN,
      tokenIn: string,
      tokenOut: string
    ): NonPayableTransactionObject<{
      amount: string;
      stable: boolean;
      0: string;
      1: boolean;
    }>;

    getAmountsOut(
      amountIn: number | string | BN,
      routes: [string, string, boolean][]
    ): NonPayableTransactionObject<string[]>;

    getReserves(
      tokenA: string,
      tokenB: string,
      stable: boolean
    ): NonPayableTransactionObject<{
      reserveA: string;
      reserveB: string;
      0: string;
      1: string;
    }>;

    isPair(pair: string): NonPayableTransactionObject<boolean>;

    mtr(): NonPayableTransactionObject<string>;

    pairFor(
      tokenA: string,
      tokenB: string,
      stable: boolean
    ): NonPayableTransactionObject<string>;

    quoteAddLiquidity(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      amountADesired: number | string | BN,
      amountBDesired: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      liquidity: string;
      0: string;
      1: string;
      2: string;
    }>;

    quoteRemoveLiquidity(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      0: string;
      1: string;
    }>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      0: string;
      1: string;
    }>;

    removeLiquidityMTR(
      token: string,
      stable: boolean,
      liquidity: number | string | BN,
      amountTokenMin: number | string | BN,
      amountMTRMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<{
      amountToken: string;
      amountMTR: string;
      0: string;
      1: string;
    }>;

    removeLiquidityMTRWithPermit(
      token: string,
      stable: boolean,
      liquidity: number | string | BN,
      amountTokenMin: number | string | BN,
      amountMTRMin: number | string | BN,
      to: string,
      deadline: number | string | BN,
      approveMax: boolean,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<{
      amountToken: string;
      amountMTR: string;
      0: string;
      1: string;
    }>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      liquidity: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN,
      approveMax: boolean,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      0: string;
      1: string;
    }>;

    sortTokens(
      tokenA: string,
      tokenB: string
    ): NonPayableTransactionObject<{
      token0: string;
      token1: string;
      0: string;
      1: string;
    }>;

    swapExactMTRForTokens(
      amountOutMin: number | string | BN,
      routes: [string, string, boolean][],
      to: string,
      deadline: number | string | BN
    ): PayableTransactionObject<string[]>;

    swapExactTokensForMTR(
      amountIn: number | string | BN,
      amountOutMin: number | string | BN,
      routes: [string, string, boolean][],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    swapExactTokensForTokens(
      amountIn: number | string | BN,
      amountOutMin: number | string | BN,
      routes: [string, string, boolean][],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    swapExactTokensForTokensSimple(
      amountIn: number | string | BN,
      amountOutMin: number | string | BN,
      tokenFrom: string,
      tokenTo: string,
      stable: boolean,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
