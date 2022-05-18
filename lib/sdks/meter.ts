import { meterify as meter } from 'meterify';
import Web3 from 'web3';

export const meterify = meter(new Web3(), 'https://testnet.meter.io'); // TODO: use env variable
