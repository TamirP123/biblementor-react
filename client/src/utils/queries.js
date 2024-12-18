import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    users {
      username
      email
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedVerses {
        verse
        savedAt
      }
    }
  }
`;

export const GET_PRAYER_REQUESTS = gql`
  query getPrayerRequests {
    getPrayerRequests {
      _id
      title
      description
      status
      category
      createdAt
      answeredAt
    }
  }
`;

