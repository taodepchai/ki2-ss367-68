import { combineReducers, createStore } from "redux";
import reducer from "./reducers/bookReducer";

const rootReducer=combineReducers({
    reducer
})
const store= createStore(rootReducer);
export default store;