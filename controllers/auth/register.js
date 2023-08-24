const bcrypt = require("bcryptjs");

const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);

  if (error) {
    return res.status(400).json(error.message);
  }

  const { email, password, phone } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    phone,
    password: hashPassword,
  });

  return res.status(201).json({
    phone: result.phone,
    email: result.email,
  });
};

module.exports = register;
