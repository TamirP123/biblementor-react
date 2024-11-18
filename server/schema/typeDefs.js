const typeDefs = `

type User {
  _id: ID!
  username: String!
  email: String!
  googleId: String
  appleId: String
  isAdmin: Boolean
}

type Query {
  users: [User]
  user(username: String!): User
  me: User
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
}

`;

module.exports = typeDefs