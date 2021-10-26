import {
  CREATE_EXPENSE,
  RETRIEVE_EXPENSES,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  DELETE_ALL_EXPENSES,
} from "./types";

import {
  getAll,
  getID,
  create,
  update,
  deleteID,
  deleteAll,
} from "../services/expense.service.js";

// receive params and return a dispatch function for the use of the useDispatch hook
export const createExpense = (title, description) => async (dispatch) => {
  try {
    // we call post request to our back-end to create new entry then return the result to
    // update our redux store by using reducer
    const res = await create(title, description);
    const dataRes = await res.json();
    dispatch({
      type: CREATE_EXPENSE,
      payload: dataRes,
    });

    return Promise.resolve(dataRes);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveExpenses = () => async (dispatch) => {
  try {
    const res = await getAll();
    const dataRes = await res.json();
    dispatch({
      type: RETRIEVE_EXPENSES,
      payload: dataRes,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateExpense = (id, amount) => async (dispatch) => {
  try {
    const res = await update(id, amount);
    const dataRes = await res.json();
    dispatch({
      type: UPDATE_EXPENSE,
      payload: { id: id, amount: amount },
    });

    return Promise.resolve(dataRes);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    const res = await deleteID(id);
    //dispatch delete expense as soon as we receive the resolved reponse from backend
    dispatch({
      type: DELETE_EXPENSE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllExpenses = () => async (dispatch) => {
  try {
    const res = await deleteAll();
    const dataRes = await res.json();
    dispatch({
      type: DELETE_ALL_EXPENSES,
      payload: {},
    });

    return Promise.resolve(dataRes);
  } catch (err) {
    return Promise.reject(err);
  }
};
