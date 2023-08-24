const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

global.basedir = __dirname;

// create app
const app = express();

// parse application/json, cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(global.basedir, "public")));

const authRouter = require("./routes/api/auth");
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/auth",
    data: "Page not found",
  });
});
app.use((err, _, res, __) => {
  res.status(500).json({
    data: "Internal Server Error",
    status: "fail",
    code: 500,
    message: err.message,
  });
});

// connect app to DB
mongoose.Promise = global.Promise;
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
