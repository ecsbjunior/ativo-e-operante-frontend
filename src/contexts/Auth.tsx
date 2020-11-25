import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';

import Loading from '../components/Loading';

interface AuthContextData {
  signed: boolean;
  username: string;
  apikey: string;
  signIn(username: string, password: string): Promise<boolean>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');
  const [apikey, setApikey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageToken = localStorage.getItem('AOAuth:token');
      const storageUsername = localStorage.getItem('AOAuth:username');

      await new Promise((resolve) => {setTimeout(resolve, 1000)});

      if(storageToken && storageUsername) {
        setApikey(storageToken);
        setUsername(storageUsername);
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(username: string, password: string) {
    const response = await auth.signIn(username, password);

    localStorage.setItem('AOAuth:token', response.token);
    localStorage.setItem('AOAuth:username', response.username);

    return response.token !== '';
  }

  function signOut() {
    setUsername('');
    localStorage.removeItem('AOAuth:token');
    localStorage.removeItem('AOAuth:username');
  }

  if(loading) {
    return (
      <Loading/>
    );
  }

  return (
    <AuthContext.Provider value={{signed: username !== '', apikey, username, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
