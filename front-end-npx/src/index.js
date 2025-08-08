import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/auth';
import { ConfigProvider } from 'antd';
import { THEME_TOKEN } from './const/tema'

import './css/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={THEME_TOKEN}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>
);
