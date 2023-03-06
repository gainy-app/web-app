import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { client } from 'services/gql/client';
import TagManager from 'react-gtm-module-defer';
import { initAmplitude } from 'utils/logEvent';

const { REACT_APP_AMPLITUDE_API_KEY, REACT_APP_GTM_CONTAINER } = process.env;

if(REACT_APP_GTM_CONTAINER) {
  const tagManagerArgs = {
    gtmId: REACT_APP_GTM_CONTAINER
  };
  TagManager.initialize(tagManagerArgs);
}

if (REACT_APP_AMPLITUDE_API_KEY) {
  initAmplitude();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);
reportWebVitals();
