import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import Routes from './routes/routes';
import { AuthProvider } from './contexts/Auth';

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes/>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
