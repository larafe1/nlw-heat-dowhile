import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';
import config from '@/config';
import { useAuth } from '@/hooks/useAuth';

function LoginBox() {
  const { handleSignIn } = useAuth();

  useEffect(() => {
    handleSignIn();
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={config.signInUrl} className={styles.signInWithGitHub}>
        <VscGithubInverted size="24" />
        Entrar com o GitHub
      </a>
    </div>
  );
}

export default LoginBox;
