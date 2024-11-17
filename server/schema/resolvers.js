const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
// Having issues with my API key via .env This is a free provided key from Stripe, typically would NOT put a secret key explicity like below.
const stripe = require("stripe")(
  "sk_test_51Pss2CC5VCV0wby5a0zQ6Apnw4Iy8Mx8kfkDD0iPgZ9YK99zBVg47LDqLqjvbbaSKwYVCOXMzxg5gbfXyz73bGiI00N0awVH2o"
);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('favorites');
        console.log("User from database:", user);
        console.log("Number of favorites:", user.favorites.length);
        return user;
      }
      throw new AuthenticationError("Not authenticated");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
