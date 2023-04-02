import { combineReducers, legacy_createStore as createStore } from "redux";
import { UserIdSlice } from "./UserIdSlice";

export const store = createStore(combineReducers({ userId: UserIdSlice }), {
  userId: "",
});
