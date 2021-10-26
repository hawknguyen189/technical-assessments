module.exports = (app) => {
  const expenses = require("../app/controllers/expense.controller");

  var router = require("express").Router();

  // Create a new expenses
  router.post("/", expenses.create);

  // Retrieve all expenses
  router.get("/", expenses.findAll);

  // Retrieve a single expense with id
  router.get("/:id", expenses.findOne);

  // Update an expense with id
  router.put("/", expenses.update);

  // Delete a expenses with id
  router.delete("/", expenses.delete);

  // delete all
  router.delete("/", expenses.deleteAll);

  app.use("/api/expenses", router);
};
