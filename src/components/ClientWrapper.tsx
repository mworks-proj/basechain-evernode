'use client';

import type { ReactNode } from 'react';
import OnchainProviders from 'src/components/OnchainProviders';

type Props = { children: ReactNode };

export default function ClientWrapper({ children }: Props) {
  return <OnchainProviders>{children}</OnchainProviders>;
}
