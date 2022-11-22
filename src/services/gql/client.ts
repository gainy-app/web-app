import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HASURA_URL,
  credentials: 'same-origin'
});

const authLink = setContext((_, {headers = {}}) => {
  const token = localStorage.getItem('token') || '';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token)}` : '',
      content_type: 'application/json'
    }
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});
