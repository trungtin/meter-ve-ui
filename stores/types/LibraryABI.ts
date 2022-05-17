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

export interface LibraryABI extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): LibraryABI;
  clone(): LibraryABI;
  methods: {
    getAmountOut(
      amountIn: number | string | BN,
      tokenIn: string,
      tokenOut: string,
      stable: boolean
    ): NonPayableTransactionObject<string>;

    getMinimumValue(
      tokenIn: string,
      tokenOut: string,
      stable: boolean
    ): NonPayableTransactionObject<{
      0: string;
      1: string;
      2: string;
    }>;

    getSample(
      tokenIn: string,
      tokenOut: string,
      stable: boolean
    ): NonPayableTransactionObject<string>;

    "getTradeDiff(uint256,address,address,bool)"(
      amountIn: number | string | BN,
      tokenIn: string,
      tokenOut: string,
      stable: boolean
    ): NonPayableTransactionObject<{
      a: string;
      b: string;
      0: string;
      1: string;
    }>;

    "getTradeDiff(uint256,address,address)"(
      amountIn: number | string | BN,
      tokenIn: string,
      pair: string
    ): NonPayableTransactionObject<{
      a: string;
      b: string;
      0: string;
      1: string;
    }>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
