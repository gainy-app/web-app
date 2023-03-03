import { ApolloError } from '@apollo/client';
import { IChoices } from 'models';
import { phoneMasks } from './constants';

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
  return extention?.extensions?.internal?.response?.body?.message || '';
};

export const parseFormResponse = (data: any, field: string) => {
  return data?.insert_app_kyc_form?.returning[0][field];
};

export const getFilteredList = ({
  data,
  value
}: {
    data: IChoices
    value: string
}) => data.filter((item: any) => item.name?.toLowerCase().indexOf(value?.toLowerCase()) !== -1);