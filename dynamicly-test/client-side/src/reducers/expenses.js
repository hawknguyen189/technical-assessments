import {
  CREATE_EXPENSE,
  RETRIEVE_EXPENSES,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  DELETE_ALL_EXPENSES,
} from "../actions/types";

const initialState = [];
//The expenses reducer will update expenses state of the Redux store
function expenseReducer(expenses = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EXPENSE:
      return [...expenses, payload];

    case RETRIEVE_EXPENSES:
      return payload;

    case UPDATE_EXPENSE:
      return expenses.map((expense) => {
        if (expense._id === payload.id) {
          return {
            ...expense,
            ...payload,
          };
        } else {
          return expense;
        }
      });

    case DELETE_EXPENSE:
      console.log(payload);
      return expenses.filter(({ _id }) => _id !== payload.id);

    case DELETE_ALL_EXPENSES:
      return [];

    default:
      return expenses;
  }
}

export default expenseReducer;
