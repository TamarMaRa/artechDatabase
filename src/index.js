const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const memberRouter = require("./routers/member");

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(userRouter);
app.use(memberRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
