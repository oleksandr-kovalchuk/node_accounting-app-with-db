const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function buildExpenseFilter({ userId, categories, from, to }) {
  const conditions = {};

  if (userId) {
    conditions.userId = userId;
  }

  if (categories) {
    conditions.category = categories;
  }

  if (from || to) {
    conditions.spentAt = {};

    if (from) {
      conditions.spentAt[Op.gte] = from;
    }

    if (to) {
      conditions.spentAt[Op.lte] = to;
    }
  }

  return conditions;
}

const getAllExpenses = async (filter) => {
  const filterConditions = buildExpenseFilter(filter);

  return Expense.findAll({ where: filterConditions });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (data) => {
  return Expense.create(data);
};

const updateExpense = async (id, data) => {
  await Expense.update(data, { where: { id } });

  return getExpenseById(id);
};

const removeExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
