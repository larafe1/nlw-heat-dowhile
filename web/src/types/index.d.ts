import { ReactNode, Dispatch, SetStateAction } from 'react';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

export interface IMessage {
  id: number;
  text: string;
  user: User;
}

export interface IMessageProviderProps {
  children: ReactNode;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IMessageProps {
  messages: IMessage[];
  isLoading: boolean;
  getLastThreeMessages: () => Promise<void>;
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

export interface IAuthProps {
  user: User | null;
  isLoading: boolean;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => void;
  getUser: (token: string) => Promise<void>;
}

export interface IAuthResponse {
  token: string;
  user: User;
}
