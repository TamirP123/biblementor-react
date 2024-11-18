import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle($email: String!, $name: String!, $googleId: String!) {
    loginWithGoogle(email: $email, name: $name, googleId: $googleId) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_WITH_APPLE = gql`
  mutation loginWithApple($email: String!, $name: String!, $appleId: String!) {
    loginWithApple(email: $email, name: $name, appleId: $appleId) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

