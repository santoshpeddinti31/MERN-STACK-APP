const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
  try {
    //
    //get email and password of req body
    const { email, password } = req.body;

    //Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Create a user with the data
    await User.create({ email, password: hashedPassword });

    //respond
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    //
    //Get the email and password of req body
    const { email, password } = req.body;

    //fiind the user with requested email
    const user = await User.findOne({ email });

    if (!user) return res.sendStatus(401);

    //compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    //create a jwt token
    const exp = Date.now() + 1000 * 50 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    //set the cookie

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    //send it
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  console.log(req.user);
  try {
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
