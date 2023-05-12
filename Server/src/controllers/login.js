const {User} = require("../DB_connection");


require("dotenv").config(); // process.env

const DB_EMAIL = process.env.EMAIL;
const DB_PASSWORD = process.env.PASSWORD;

const STATUS_OK = 200;
const STATUS_ERROR = 404;

function login(req, res) {
  const { password, email } = req.query;
  try {
    if (!password || !email) {
      return res
        .status(500)
        .json({ message: "There isn't a password or email" });
    }
    if (password === DB_PASSWORD && email === DB_EMAIL) {
      res.status(STATUS_OK).json({ access: true });
    } else {
      res.status(STATUS_OK).json({ access: false });
    }
  } catch (error) {
    res.status(STATUS_ERROR).json(error);
  }
}

async function register(req, res) {
  const { password, id, email } = req.body;
  try {
    if (!password || !email) {
      res.status(STATUS_ERROR).json({ message: "error" });
    }
    const user = await User.create({ password, email, id });
    res.status(STATUS_OK).json(user);
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error });
  }
}

module.exports = {
  login,
  register,
};
