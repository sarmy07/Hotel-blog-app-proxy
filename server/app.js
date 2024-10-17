const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRoute");
const blogRouter = require("./router/blogRoute");
const commentRouter = require("./router/commentRoute");
const path = require("path");

const _dirname = path.resolve();
const mongo_url = `${process.env.MONGO_URI}`;
const port = process.env.PORT || 3050;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

const connect = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("connected to mongoDB");
    app.listen(port, () => {
      console.log(`Server is now running on port: ${port}`);
    });
  } catch (error) {
    console.log("failed to connect");
    console.log(error);
  }
};

connect();
