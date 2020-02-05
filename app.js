"use strict";
// require("dotenv").config();
const app = require("./main")();

app.listen(process.env.PORT || 3000, err => {
  if (err) {
    console.log("Encountered a problem on boot:" + err);
    process.exit(1);
  }
  console.log("Booting up the server on port 3000");
  console.log(process.env.PORT);
});
