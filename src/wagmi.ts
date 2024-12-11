'use client';

import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'xahau-evernode-coinbase-commerce',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
