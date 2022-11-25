import { gql } from '@apollo/client';

export const SEND_APP_LINK = gql`
    mutation SendAppLink($phone_number: String!) {
      send_app_link(
        phone_number: $phone_number
      ){
        ok
      }
}
`;
