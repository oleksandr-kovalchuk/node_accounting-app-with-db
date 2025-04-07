const serviceUsers = require('../services/usersService');

const get = async (req, res) => {
  const users = await serviceUsers.getAllUsers();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await serviceUsers.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await serviceUsers.createUser(name);

  res.status(201).send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await serviceUsers.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await serviceUsers.removeUser(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    return res.sendStatus(400);
  }

  const existingUser = await serviceUsers.getUserById(id);

  if (!existingUser) {
    return res.sendStatus(404);
  }

  const updatedUser = await serviceUsers.updateUser({ id, name });

  res.status(200).send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
