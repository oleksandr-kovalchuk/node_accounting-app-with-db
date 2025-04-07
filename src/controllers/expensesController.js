const serviceExpenses = require('../services/expensesServise');
const serviceUsers = require('../services/usersService');

const get = async (req, res) => {
  const queryFilters = req.query;
  const expenses = await serviceExpenses.getAllExpenses(queryFilters);

  res.status(200).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await serviceExpenses.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const expenseData = req.body;

  const associatedUser = await serviceUsers.getUserById(expenseData.userId);

  if (!associatedUser) {
    return res.sendStatus(400);
  }

  const newExpense = await serviceExpenses.createExpense(expenseData);

  res.status(201).send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await serviceExpenses.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await serviceExpenses.removeExpense(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const existingExpense = await serviceExpenses.getExpenseById(id);

  if (!existingExpense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await serviceExpenses.updateExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
