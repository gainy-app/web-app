import { boolean, object, string } from 'yup';

export const kycSchema = object({
  country: string().required(),
  citizenship: boolean().required(),
  email: string().required(),
  phone:string().required(),
  verifyCode: string().required(),
  username:string().required(),
  lastname: string().required(),
  birthday: string().required(),
  addressLine: string().required(),
  addressLine2: string().required(),
  city: string().required(),
  state: string().required(),
  zipcode: string().required(),
  socialSecurityNumber: string().required(),
  tag: string().required(),
  companyName:string().required(),
  industry: string().required(),
  jobTitle: string().required(),
  source: string().required(),
  broker:  boolean().required(),
  person: string().required(),
  tradedCompany: string().required(),
  notify:  boolean().required(),
  anualIncome: string().required(),
  networthTotal: string().required(),
  networthLiqued: string().required(),
  exp: string().required(),
  objectives: string().required(),
  risk:string().required(),
});

export const countrySchema = object({
  country: string().required(),
});

export const citizenSchema = object({
  citizenship: string().required(),
});

export const validationSchema = (index: number) => {
  switch (index) {
    case 1 : return countrySchema;
    case 3 : return citizenSchema;
    default: return object({});
  }
};