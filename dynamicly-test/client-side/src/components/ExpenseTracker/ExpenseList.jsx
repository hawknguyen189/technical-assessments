import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense, deleteExpense } from "../../actions/expenses";
import { convertToCurrency, convertDate } from "../../services/utils.service";

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [editAmount, setEditAmount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState("");
  const handleEdit = async (id) => {
    setUpdating(true);
    try {
      const res = await dispatch(updateExpense(id, editAmount));
      setUpdated(res.data);
      setEditAmount(0);
    } catch (e) {
      console.log(e);
    }
    setUpdating(false);
  };
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await dispatch(deleteExpense(id));
      setDeleted(res.data);
    } catch (e) {
      console.log(e);
    }
    setDeleting(false);
  };
  return (
    <div className="expense-list py-4">
      <div className="row">
        <p className="col-sm h6 fw-bold text-dark py-3">Descrition</p>
        <p className="col-sm h6 fw-bold text-dark py-3">Amount</p>
        <p className="col-sm h6 fw-bold text-dark py-3">Taxes (15%)</p>
        <p className="col-sm h6 fw-bold text-dark py-3">Date</p>
        <p className="col-sm"></p>
      </div>
      {expenses.length &&
        expenses.map((element, index) => {
          return (
            <div className="row" key={index}>
              {/* expense title */}
              <p className="col-sm">{element.title}</p>
              {/* call  convertToCurrency to format expense  */}
              <p className="col-sm">{convertToCurrency(element.amount)}</p>
              <p className="col-sm">
                {convertToCurrency(element.amount * 0.15)}
              </p>
              {/* we're gonna use the latest update date, if not -> use created date */}
              <p className="col-sm">
                {convertDate(element.updatedAt) ||
                  convertDate(element.createdAt)}
              </p>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-warning mx-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#editExpense${index}`}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      window.confirm("Are you sure to delete this expense?")
                    ) {
                      handleDelete(element._id);
                    }
                  }}
                >
                  Delete
                </button>
                {/* edit button modal */}
                <div
                  className="modal fade"
                  id={`editExpense${index}`}
                  tabIndex="-1"
                  aria-labelledby={`editExpense${index}`}
                  aria-hidden="true"
                  data-foo-bar={element.title}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`editExpense${index}`}>
                          Update Expense{" "}
                          <span className="fst-italic">{element.title}</span>
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3 row">
                            <label
                              htmlFor="title"
                              className="form-label col-sm-4"
                            >
                              Update Expense
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                className="form-control"
                                aria-describedby="expenseHelp"
                                value={editAmount || ""}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setEditAmount(e.target.value);
                                }}
                              />
                              {!editAmount && (
                                <div id="expenseHelp" className="form-text">
                                  Expense amount can not be empty
                                </div>
                              )}
                            </div>
                          </div>
                          {!updating ? (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(element._id);
                              }}
                            >
                              Update Amount
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-secondary"
                              disabled
                            >
                              Updating
                            </button>
                          )}
                        </form>
                      </div>
                      <div className="modal-footer">
                        <p>
                          {updated
                            ? `You've just updated ${
                                updated.title
                              } as ${convertToCurrency(updated.amount)} amount`
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
        })}
    </div>
  );
};

export default ExpenseList;
