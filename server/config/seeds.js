const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {


  console.log("Admin user seeded");

  
  console.log("Sneakers seeded");

  process.exit();
});
