import { ApolloError } from '@apollo/client';
import { IChoices } from 'models';
import { phoneMasks } from './constants';
import Cookies from 'js-cookie';

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

export const getDeviceId = (deviceIdSearchParam?: string | null): string => {
  const deviceId = deviceIdSearchParam || localStorage.getItem('deviceId') || '';

  if (deviceId) {
    localStorage.setItem('deviceId', deviceId);
  }

  return deviceId;
};

export const getQueryAppLink = () => {
  /**
   * default value of sbjs_first (equal to sbjs_current)
   *
   * typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29
   *
   * decoded - typ=typein|||src=(direct)|||mdm=(none)|||cmp=(none)|||cnt=(none)|||trm=(none)
   */
  const utmConfig = {
    // sbjs.get.first.src
    source: 'direct',
    // sbjs.get.first.mdm
    channel: 'none',
    // sbjs.get.first.cmp
    company: 'none',
  };
  const sbjsFirst = Cookies.get('sbjs_first');

  if (sbjsFirst) {
    const sbjsFirstString = decodeURIComponent(sbjsFirst);
    const sbjsFirstValues = sbjsFirstString.split('|||');

    if (sbjsFirstValues.length) {
      sbjsFirstValues.forEach((element) => {
        const [elementName, elementValue] = element.split('=');

        switch (elementName) {
          case 'src':
            utmConfig.source = elementValue.slice(1, -1);
            break;
          case 'mdm':
            utmConfig.channel = elementValue.slice(1, -1);
            break;
          case 'cmp':
            utmConfig.company = elementValue.slice(1, -1);
            break;
          default:
            break;
        }
      });
    }
  }

  return `https://go.gainy.app/ZOFw?af_js_web=true&af_ss_ver=2_2_0&pid=website_${utmConfig.source}_${utmConfig.channel}&c=${utmConfig.company}`;
};
