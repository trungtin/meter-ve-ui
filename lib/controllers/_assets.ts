export const routeAssets = [
  {
    chainId: 83,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xfA54A8f4096926658A9E8b9b1668D7036eb5c19c',
    decimals: 18,
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png',
  },
  {
    chainId: 83,
    name: 'Dai Token',
    symbol: 'DAI',
    address: '0x50D3659070D35Af3a4DeEb8125dF2eA3dB43af00',
    decimals: 18,
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3/logo.png',
  },
  {
    chainId: 83,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x77715B17a7A22Bd9c5ddC0212A57c049865cBa35',
    decimals: 18,
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
];

export const baseAssets = [
  ...routeAssets,
  {
    chainId: 83,
    name: 'Magic Internet Money',
    symbol: 'MIM',
    address: '0x75ed7561d16e9223C237C73193b3daCdD6c1650C',
    decimals: 18,
    logoURI: 'https://assets.spookyswap.finance/tokens/MIM.png',
  },
];
