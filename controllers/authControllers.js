const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromise = require("fs/promises");
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const findUser = usersDB.users.find((person) => person.username === user);

  if (!findUser) return res.sendStatus(401);

  //evaluate password
  const match = await bcrypt.compare(pass, findUser.password);

  if (match) {
    //create JWT
    const accessToken = jwt.sign(
      { username: findUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: findUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving refreshToken with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== findUser.username
    );

    const currentUser = { ...findUser, refreshToken };

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    // res.json({ success: `User ${user} logged in.` });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
