import ReactDOM from 'react-dom';

import '@/styles/global.css';
import App from './App';
import { AuthProvider } from '@/hooks/useAuth';
import { MessagesProvider } from '@/hooks/useMessages';

ReactDOM.render(
  <AuthProvider>
    <MessagesProvider>
      <App />
    </MessagesProvider>
  </AuthProvider>,
  document.getElementById('root')
);
