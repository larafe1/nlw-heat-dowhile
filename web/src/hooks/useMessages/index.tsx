import { createContext, useContext, useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

import api from '@/services/api';
import { IMessageProps, IMessageProviderProps, IMessage } from '@/types';

export const MessagesContext = createContext({} as IMessageProps);

function MessagesProvider({ children }: IMessageProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([] as IMessage[]);

  const getLastThreeMessages = useCallback(async () => {
    setIsLoading(true);
    await api
      .get('messages/last3')
      .then(({ data }: AxiosResponse<IMessage[] | any>) => {
        setMessages(data);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isLoading,
        getLastThreeMessages,
        setMessages
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

function useMessages() {
  const ctx = useContext(MessagesContext);
  return ctx;
}

export { MessagesProvider, useMessages };
