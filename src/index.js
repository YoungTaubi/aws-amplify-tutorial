import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth'
import { UserInfoProviderWrapper } from './context/userInfo';

import { Amplify } from 'aws-amplify';
import config from './aws-exports'


Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProviderWrapper>
      <UserInfoProviderWrapper>
        <AmplifyProvider>
          <App />
        </AmplifyProvider>
      </UserInfoProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
