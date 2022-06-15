import { Types } from "./actions";
const defaultState = {
	projectname: "",
	urls: [],
};
const reducer = (state = defaultState, action) => {
	let newState = { ...state };
	if (!action.payload) return newState;
	const { pname, urls } = action.payload;
	switch (action.type) {
		case Types.SET_PROJECT_NAME:
			newState.projectname = pname;
			break;
		case Types.UPDATE_TOKEN_IMAGES:
			newState.urls = urls;
			break;
		default:
			break;
	}
	return newState;
};
export default reducer;
