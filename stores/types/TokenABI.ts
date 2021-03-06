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

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type LogChangeVault = ContractEventLog<{
  oldVault: string;
  newVault: string;
  effectiveTime: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface TokenABI extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): TokenABI;
  clone(): TokenABI;
  methods: {
    DOMAIN_SEPARATOR(): NonPayableTransactionObject<string>;

    PERMIT_TYPEHASH(): NonPayableTransactionObject<string>;

    allowance(arg0: string, arg1: string): NonPayableTransactionObject<string>;

    approve(
      _spender: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(arg0: string): NonPayableTransactionObject<string>;

    burn(
      account: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    changeVault(_pendingRouter: string): NonPayableTransactionObject<boolean>;

    decimals(): NonPayableTransactionObject<string>;

    mint(
      account: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    minter(): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    nonces(arg0: string): NonPayableTransactionObject<string>;

    pendingRouter(): NonPayableTransactionObject<string>;

    pendingRouterDelay(): NonPayableTransactionObject<string>;

    permit(
      owner: string,
      spender: string,
      value: number | string | BN,
      deadline: number | string | BN,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<void>;

    router(): NonPayableTransactionObject<string>;

    setMinter(_minter: string): NonPayableTransactionObject<void>;

    symbol(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transfer(
      _to: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      _from: string,
      _to: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    LogChangeVault(cb?: Callback<LogChangeVault>): EventEmitter;
    LogChangeVault(
      options?: EventOptions,
      cb?: Callback<LogChangeVault>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "LogChangeVault", cb: Callback<LogChangeVault>): void;
  once(
    event: "LogChangeVault",
    options: EventOptions,
    cb: Callback<LogChangeVault>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
