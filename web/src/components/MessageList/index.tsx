import { useEffect } from 'react';
import io from 'socket.io-client';

import config from '@/config';
import styles from './styles.module.scss';
import logoImg from '@/assets/logo.svg';
import { useMessages } from '@/hooks/useMessages';
import { IMessage } from '@/types';

const messagesQueue: IMessage[] = [];

const socket = io(config.apiUrl);
socket.on('newMessage', (newMsg) => {
  messagesQueue.push(newMsg);
});

function MessageList() {
  const { getLastThreeMessages, isLoading, messages, setMessages } =
    useMessages();

  useEffect(() => {
    getLastThreeMessages();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {isLoading ? (
          <h1>Loading Messages...</h1>
        ) : (
          messages.map((message) => (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImg}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MessageList;
