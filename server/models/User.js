const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  appleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  savedVerses: [{
    verse: {
      type: String,
      required: true
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }]
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    if (this.password === "GOOGLE-AUTH-USER" || this.password === "APPLE-AUTH-USER") {
      return next();
    }
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  if (this.password === "GOOGLE-AUTH-USER" || this.password === "APPLE-AUTH-USER") {
    return false;
  }
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
