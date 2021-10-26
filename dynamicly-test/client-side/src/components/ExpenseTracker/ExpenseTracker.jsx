import React from "react";
import TotalExpenses from "./TotalExpenses";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  return (
    <div className="tracker-container container border my-5">
      <p className="h1 text-uppercase fw-bold text-dark py-3">
        Expense Tracker
      </p>
      <TotalExpenses></TotalExpenses>
      <ExpenseList></ExpenseList>
    </div>
  );
};

export default ExpenseTracker;
