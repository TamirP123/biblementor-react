const typeDefs = `
  type SavedVerse {
    verse: String!
    savedAt: String!
  }

  type PrayerRequest {
    _id: ID!
    title: String!
    description: String!
    status: String!
    category: String!
    createdAt: String!
    answeredAt: String
  }

  input PrayerRequestInput {
    title: String!
    description: String!
    category: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    googleId: String
    appleId: String
    isAdmin: Boolean
    savedVerses: [SavedVerse]
    prayerRequests: [PrayerRequest]
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    getPrayerRequests: [PrayerRequest]
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    loginWithGoogle(email: String!, name: String!, googleId: String!): Auth
    loginWithApple(email: String!, name: String!, appleId: String!): Auth
    saveVerse(verse: String!): User
    removeVerse(verse: String!): User
    createPrayerRequest(input: PrayerRequestInput!): User
    updatePrayerStatus(prayerRequestId: ID!, status: String!): User
    deletePrayerRequest(prayerRequestId: ID!): User
  }
`;

module.exports = typeDefs;