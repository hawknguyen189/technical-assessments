import { combineReducers } from "redux";
import expenses from "./expenses";

//we use only single redux store for this small web app
export default combineReducers({
  expenses,
});
