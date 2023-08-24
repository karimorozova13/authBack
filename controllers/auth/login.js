// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  // if (!user) {
  //   return res.status(401).json({ message: `${email} doesn't exist` });
  // }

  // const comparedPassword = await bcrypt.compare(password, user.password);

  // if (!comparedPassword) {
  //   return res.status(401).json({ message: `Password isn't correct` });
  // }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

  await User.findByIdAndUpdate(user._id, { token });

  return res.json({ token });
};

module.exports = login;
