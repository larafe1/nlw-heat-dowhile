import { createContext, useContext, useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

import api from '@/services/api';
import { IAuthProps, IAuthProviderProps, User, IAuthResponse } from '@/types';

export const AuthContext = createContext({} as IAuthProps);

function AuthProvider({ children }: IAuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = useCallback(async () => {
    const url = window.location.href;
    const hasGitHubCode = url.includes('?code=');
    if (hasGitHubCode) {
      setIsLoading(true);
      const [baseUrl, gitHubCode] = url.split('?code=');
      window.history.pushState({}, '', baseUrl);

      await api
        .post('/authenticate', { code: gitHubCode })
        .then(({ data }: AxiosResponse<IAuthResponse | any>) => {
          api.defaults.headers.common.authorization = 'Bearer ' + data.token;
          localStorage.setItem('@dowhile:token', data.token);
          setUser(data.user);
        })
        .catch((err: AxiosError) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  };

  const getUser = useCallback(async (token: string) => {
    setIsLoading(true);
    api.defaults.headers.common.authorization = 'Bearer ' + token;

    await api
      .get('/profile')
      .then(({ data }: AxiosResponse<User | any>) => {
        setUser(data);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        handleSignIn,
        handleSignOut,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx;
}

export { AuthProvider, useAuth };
