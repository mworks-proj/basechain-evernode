import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from 'src/types';
import airpodsImage from '../images/airpods.png';
import bottleImage from '../images/bottle.png';
import jacketImage from '../images/jacket.png';
import mugImage from '../images/mug.png';
import type { OnchainStoreContextType } from '../types';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

const products: Product[] = [
  {
    id: '740c941e-38af-4709-868b-5e3de2adad8f',
    name: `'Xaholographic' Sticker 4″×2″`,
    price: 6.99,
    image: jacketImage,
  },
  {
    id: 'a82e2edc-3033-481b-9a79-4a77b5199106',
    name: `'XAH' Crossbody Bag`,
    price: 34.99,
    image: airpodsImage,
  },
  {
    id: 'product3',
    name: `'XAH' Mug`,
    price: 10.99,
    image: mugImage,
  },
  {
    id: 'db4618d4-c1a2-47e8-9330-63ddcf9e0695',
    name: `'XAH' Trucker`,
    price: 29.99,
    image: bottleImage,
  },
];

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState({});
  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
    };
  }, [quantities]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
