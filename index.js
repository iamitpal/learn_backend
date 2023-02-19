const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.routes");
const { blogRouter } = require("./routes/Blog.routes");
const { authenticate } = require("./middleware/authenticate.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/blogs", blogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB Altas");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`running on port ${process.env.port}`);
});
