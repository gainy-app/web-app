import { IChoices } from 'models';

export interface ICitizenship {
  placeholder?: string
  prevValue?: {
    name?:string
    value?:string
  }
  choices?: IChoices
}