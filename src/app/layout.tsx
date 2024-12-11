import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import './global.css';
import '@coinbase/onchainkit/styles.css';
import ClientWrapper from 'src/components/ClientWrapper';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Xahau Evernode Coinbase Commerce',
  description: 'Built with Coinbase atop Evernode Xahau Network',
  openGraph: {
    title: 'Xahau Evernode Coinbase Commerce',
    description: 'Built with Coinbase atop Evernode Xahau Network',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
