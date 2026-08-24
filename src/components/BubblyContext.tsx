'use client';

import { createContext, useContext, useState } from 'react';

type BubblyContextValue = {
  introActive: boolean;
  setIntroActive: (active: boolean) => void;
};

const BubblyContext = createContext<BubblyContextValue | null>(null);

export function BubblyProvider({ children }: { children: React.ReactNode }) {
  const [introActive, setIntroActive] = useState(false);

  return (
    <BubblyContext.Provider value={{ introActive, setIntroActive }}>
      {children}
    </BubblyContext.Provider>
  );
}

// Lets IntroSequence (only ever mounted on the home page) tell Bubbly to
// stay hidden while the full-screen intro overlay is covering the page.
export function useIntroActive() {
  const ctx = useContext(BubblyContext);
  return ctx?.introActive ?? false;
}

export function useSetIntroActive() {
  const ctx = useContext(BubblyContext);
  return ctx?.setIntroActive ?? (() => {});
}
