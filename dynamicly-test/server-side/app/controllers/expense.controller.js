const db = require("../models");
const Expense = db.expense;

// Create and Save a new expense
exports.create = (req, res) => {
  console.log("create");
  // Validate request
  if (!req.body.title) {
    console.log(req.body.title);
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a expense
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
  });

  // Save expense in the database
  expense
    .save(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the expense.",
      });
    });
};

// Retrieve all expenses from the database.
exports.findAll = (req, res) => {
  console.log("find all");
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Expense.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};

// Find a single expense with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Expense with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Expense with id=" + id });
    });
};

// Update a expense by the id in the request
exports.update = (req, res) => {
  console.log("updating expense", req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.body.id;

  Expense.findByIdAndUpdate(
    id,
    { amount: req.body.amount },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found!`,
        });
      } else
        res.send({ data: data, message: "Expense was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id,
      });
    });
};

// Delete a expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;
  console.log("deleting expense id", id);

  Expense.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      } else {
        res.send({
          message: "Expense was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id,
      });
    });
};

// Delete all expenses from the database.
exports.deleteAll = (req, res) => {
  Expense.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Expenses were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Expense.",
      });
    });
};
