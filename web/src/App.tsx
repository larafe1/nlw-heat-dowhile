import { useEffect } from 'react';

import styles from '@/styles/App.module.scss';
import MessageList from '@/components/MessageList';
import LoginBox from '@/components/LoginBox';
import SendMessageForm from '@/components/SendMessageForm';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const { getUser, user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      getUser(token);
    }
  }, []);

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ''
      }`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}

export default App;
