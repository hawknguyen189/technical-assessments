import React, { useEffect, useCallback } from "react";
import "./App.css";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import { useDispatch } from "react-redux";
import { retrieveExpenses } from "./actions/expenses";

function App() {
  const dispatch = useDispatch();
  const retrieveAll = useCallback(async () => {
    try {
      const res = await dispatch(retrieveExpenses());
    } catch (e) {
      console.log("retrieve all error", e);
    }
  }, []);

  useEffect(() => {
    retrieveAll();
    return () => {};
  }, [retrieveAll]);
  return (
    <div className="App">
      <ExpenseTracker></ExpenseTracker>
    </div>
  );
}

export default App;
