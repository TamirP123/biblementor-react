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
  mutation loginWithGoogle(
    $email: String!
    $name: String!
    $googleId: String!
  ) {
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

export const SAVE_VERSE = gql`
  mutation saveVerse($verse: String!) {
    saveVerse(verse: $verse) {
      _id
      username
      savedVerses {
        verse
        savedAt
      }
    }
  }
`;

export const REMOVE_VERSE = gql`
  mutation removeVerse($verse: String!) {
    removeVerse(verse: $verse) {
      _id
      username
      savedVerses {
        verse
        savedAt
      }
    }
  }
`;

export const CREATE_PRAYER_REQUEST = gql`
  mutation createPrayerRequest($input: PrayerRequestInput!) {
    createPrayerRequest(input: $input) {
      _id
      prayerRequests {
        _id
        title
        description
        status
        category
        createdAt
        answeredAt
      }
    }
  }
`;

export const UPDATE_PRAYER_STATUS = gql`
  mutation updatePrayerStatus($prayerRequestId: ID!, $status: String!) {
    updatePrayerStatus(prayerRequestId: $prayerRequestId, status: $status) {
      _id
      prayerRequests {
        _id
        status
        answeredAt
      }
    }
  }
`;

export const DELETE_PRAYER_REQUEST = gql`
  mutation deletePrayerRequest($prayerRequestId: ID!) {
    deletePrayerRequest(prayerRequestId: $prayerRequestId) {
      _id
      prayerRequests {
        _id
      }
    }
  }
`;
