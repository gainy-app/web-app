import { ApolloError } from '@apollo/client';
import {phoneMasks} from './constants';

export const formatNumber = (phone: string, mask: string) => {
  switch (mask) {
    case phoneMasks.us: {
      return `+1${phone}`;
    }
    default:
      return phone;
  }
};

export const parseGQLerror = (error?: ApolloError) => {
  if(!error) return '';
  const extention = error.graphQLErrors.find((i: {message:string}) => i.message);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return extention.extensions.internal.response.body.message || '';
};
