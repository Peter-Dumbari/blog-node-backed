const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auths");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
