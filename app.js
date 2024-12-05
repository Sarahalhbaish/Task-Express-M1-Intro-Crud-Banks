const express = require("express");
const accountRouters = require("./apis/accounts/routes");

const app = express();

app.use(express.json());
app.use("/apis/accounts", accountRouters);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
