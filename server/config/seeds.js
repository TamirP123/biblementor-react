const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany({});

  await User.create({
    username: "user",
    email: "user@gmail.com",
    password: "password"
  });

  console.log("User seeded!");
  process.exit();
});
