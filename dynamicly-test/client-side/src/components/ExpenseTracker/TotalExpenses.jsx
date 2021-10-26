import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../../actions/expenses";
import { convertToCurrency } from "../../services/utils.service";

const TotalExpenses = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [newExpense, setNewExpense] = useState({});
  const [total, setTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await dispatch(createExpense(title, amount));
      setNewExpense(res);
      setTitle("");
      setAmount("");
    } catch (e) {
      console.log("create expense error", e);
    }
    setSubmitting(false);
  };

  const calTotalExpense = useCallback(() => {
    const total = expenses.reduce(
      (acc, cur) => acc + parseFloat(cur.amount),
      0
    );
    setTotal(total);
  }, [expenses]);

  useEffect(() => {
    calTotalExpense();
    return () => {};
  }, [calTotalExpense]);
  return (
    <div className="row">
      <div className="col-sm text-start">
        <p>The sub-total of expenses is {convertToCurrency(total * 0.85)}</p>
        <p>The total with taxes is {convertToCurrency(total)}</p>
      </div>
      <div className="col-sm">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addExpense"
        >
          Add new expense
        </button>

        <div
          className="modal fade"
          id="addExpense"
          tabIndex="-1"
          aria-labelledby="addExpense"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addExpense">
                  Submit new expense
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label
                      htmlFor="title"
                      className="form-label col-sm-4 fst-italic fw-bolder"
                    >
                      Expense Title
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="expenseHelp"
                        value={title || ""}
                        onChange={(e) => {
                          e.preventDefault();
                          setTitle(e.target.value);
                        }}
                      />
                      {!title && (
                        <div id="expenseHelp" className="form-text">
                          Expense Title can not be empty
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="title"
                      className="form-label col-sm-4 fst-italic fw-bolder"
                    >
                      Expense Amount
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        aria-describedby="expenseHelp"
                        value={amount || ""}
                        onChange={(e) => {
                          e.preventDefault();
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {!submitting ? (
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled
                    >
                      Submitting
                    </button>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <p>
                  {newExpense._id
                    ? `You've successfully created new expense ${
                        newExpense.title
                      } as the amount of ${convertToCurrency(
                        newExpense.amount
                      )}`
                    : ""}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalExpenses;
