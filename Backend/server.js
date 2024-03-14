//load env variables

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//important dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./config/connectToDb.js");
const todosController = require("./controllers/controller.js");
const usersController = require("./controllers/userController.js");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth.js");

const { createProxyMiddleware } = require("http-proxy-middleware");

//configure express app
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  "/",
  createProxyMiddleware({
    target: "https://mern-stack-app-phi.vercel.app", //frontend url
    changeOrigin: true,
    //secure:false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["access-control-allow-origin"] = "*";
    },
  })
);

//connect to database
connectToDb();

//Routing

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/todos", requireAuth, todosController.fetchTodos);
app.get("/todos/:id", requireAuth, todosController.fetchTodo);
app.post("/todos", requireAuth, todosController.createTodo);
app.put("/todos/:id", requireAuth, todosController.updateTodo);
app.delete("/todos/:id", requireAuth, todosController.deleteTodo);

//start our server
app.listen(process.env.PORT, () => console.log("server start live..."));
