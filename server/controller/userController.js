const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json("please fill out all fields");
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json("User already exits!");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    const user = new User({ username, email, password: hashPassword });
    await user.save();
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("Please fill out all fields!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      return res.status(400).json("Invalid login credentials");
    }

    const token = jwt.sign( 
      { id: user._id, role: user.role },
      process.env.secret,
      { expiresIn: "1h" }
    ); 

    const { password: pass, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })   
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("logout successful");
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id email role");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    return res.status(200).json("User deleted!");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body; // only update role
  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json("User not found!");
    }
    return res.status(200).json("User updated!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
};
