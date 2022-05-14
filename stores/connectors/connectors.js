import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  82: 'https://rpc.meter.io/',
  83: 'https://rpctest.meter.io',
};

let obj = {};
if (process.env.NEXT_PUBLIC_CHAINID == 82) {
  obj = { 82: RPC_URLS[82] };
} else {
  obj = { 83: RPC_URLS[83] };
}

export const network = new NetworkConnector({ urls: obj });

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(process.env.NEXT_PUBLIC_CHAINID)],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    82: RPC_URLS[82],
    83: RPC_URLS[83],
  },
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[process.env.NEXT_PUBLIC_CHAINID],
  appName: 'Solidly',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
});
