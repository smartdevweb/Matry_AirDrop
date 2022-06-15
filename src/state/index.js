import { createStore, combineReducers } from "redux";

import application from "./application/reducer";
import createPage from "./createPage/reducer";

export default function configureStore(initialState) {
	const reducer = combineReducers({
		application,
		createPage,
	});
	const store = createStore(reducer, initialState);
	return store;
}
