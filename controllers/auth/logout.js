const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id);

  res.status(204).send("Done");
};

module.exports = logout;
