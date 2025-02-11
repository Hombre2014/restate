import React, { createContext, useContext, ReactNode } from 'react';

import { useAppwrite } from './useAppwrite';
import { getCurrentUser } from './appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  loading: boolean;
  user: User | null;
  isLoggedIn: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    loading,
    refetch,
    data: user,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;

  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        refetch,
        loading,
        isLoggedIn,
        user: user ?? null,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');

  return context;
};

export default GlobalProvider;
