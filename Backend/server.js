//load env variables

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//important dependencies
const express = require("express");
const app = express();
const connectToDb = require("./config/connectToDb.js");
const todosController = require("./controllers/controller.js");
const usersController = require("./controllers/userController.js");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth.js");
const mongoose = require("mongoose");

//configure express app
app.use(express.json());
app.use(cookieParser());

// frontend url : https://mern-stack-app-3bv6.vercel.app/

const cors = require("cors");
const corsOptions = {
  origin: "https://mern-stack-app-3bv6.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//connect to database
async function connectDb() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("dB connected ...");
  } catch (error) {
    console.log(error);
  }
}
connectDb();

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
