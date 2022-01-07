const express = require("express");
const securityRouter = require("./routes/security");
const userRouter = require("./routes/user");
const commentsRouter = require("./routes/comments");
const articlesRouter = require("./routes/articles");
const connection = require("./lib/db");
const verifyJWT = require("./middlewares/verifyJWT");
connection.sync();
const app = express();

app.use(express.json());

app.use("", securityRouter);
app.use("/users", userRouter);
app.use("/comments", commentsRouter);
app.use("/articles", articlesRouter);

app.listen(3000, () => console.log("Server is listening"));