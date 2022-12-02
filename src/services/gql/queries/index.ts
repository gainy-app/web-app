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

export const CREATE_APP_LINK = gql`
  mutation CreateAppProfile($email: String!, $firstName: String!, $lastName: String!, $userID: String!){
    insert_app_profiles(objects: {
      email: $email, 
      first_name: $firstName, 
      last_name: $lastName,
      user_id: $userID,
    }) {
      returning {
        id
      }
    }
  }
`;