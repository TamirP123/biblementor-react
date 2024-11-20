const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
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
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
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

    loginWithGoogle: async (parent, { email, name, googleId }) => {
      try {
        let user = await User.findOne({ googleId });

        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = googleId;
            await user.save();
          } else {
            user = await User.create({
              username: name,
              email,
              googleId,
              password: 'GOOGLE-AUTH-USER',
            });
          }
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error with Google login: ' + error.message);
      }
    },

    loginWithApple: async (parent, { email, name, appleId }) => {
      try {
        let user = await User.findOne({ appleId });

        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            user.appleId = appleId;
            await user.save();
          } else {
            user = await User.create({
              username: name,
              email,
              appleId,
              password: 'APPLE-AUTH-USER',
            });
          }
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error with Apple login: ' + error.message);
      }
    },

    saveVerse: async (parent, { verse }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $addToSet: { 
                savedVerses: {
                  verse,
                  savedAt: new Date()
                }
              }
            },
            { new: true }
          );
          return updatedUser;
        } catch (err) {
          throw new Error('Error saving verse');
        }
      }
      throw new AuthenticationError('Not logged in');
    },

    removeVerse: async (parent, { verse }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $pull: {
                savedVerses: { verse }
              }
            },
            { new: true }
          );
          return updatedUser;
        } catch (err) {
          throw new Error('Error removing verse');
        }
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
