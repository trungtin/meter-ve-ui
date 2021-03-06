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

export type Initialize = ContractEventLog<{
  initializer: string;
  active_period: string;
  0: string;
  1: string;
}>;
export type Mint = ContractEventLog<{
  sender: string;
  weekly: string;
  circulating_supply: string;
  circulating_emission: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;

export interface MinterABI extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MinterABI;
  clone(): MinterABI;
  methods: {
    _token(): NonPayableTransactionObject<string>;

    _ve(): NonPayableTransactionObject<string>;

    _ve_dist(): NonPayableTransactionObject<string>;

    _voter(): NonPayableTransactionObject<string>;

    active_period(): NonPayableTransactionObject<string>;

    calculate_emission(): NonPayableTransactionObject<string>;

    calculate_growth(
      _minted: number | string | BN
    ): NonPayableTransactionObject<string>;

    circulating_emission(): NonPayableTransactionObject<string>;

    circulating_supply(): NonPayableTransactionObject<string>;

    initialize(
      claimants: string[],
      amounts: (number | string | BN)[],
      max: number | string | BN
    ): NonPayableTransactionObject<void>;

    update_period(): NonPayableTransactionObject<string>;

    weekly(): NonPayableTransactionObject<string>;

    weekly_emission(): NonPayableTransactionObject<string>;
  };
  events: {
    Initialize(cb?: Callback<Initialize>): EventEmitter;
    Initialize(options?: EventOptions, cb?: Callback<Initialize>): EventEmitter;

    Mint(cb?: Callback<Mint>): EventEmitter;
    Mint(options?: EventOptions, cb?: Callback<Mint>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Initialize", cb: Callback<Initialize>): void;
  once(
    event: "Initialize",
    options: EventOptions,
    cb: Callback<Initialize>
  ): void;

  once(event: "Mint", cb: Callback<Mint>): void;
  once(event: "Mint", options: EventOptions, cb: Callback<Mint>): void;
}
