const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const findUser = usersDB.users.find(person => person.username === user)

  if(!findUser) return res.sendStatus(401);

  //evaluate password 
  const match = await bcrypt.compare(pass, findUser.password);

  if(match){
    //create JWT 
    res.json({'success': `User ${user} logged in.`})
  }else{
    res.sendStatus(401);
  }
};


module.exports = {handleLogin}