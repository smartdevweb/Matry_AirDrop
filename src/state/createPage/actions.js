const Types = {
	SET_PROJECT_NAME: "createPage/setProjectName",
	UPDATE_TOKEN_IMAGES: "createPage/updateTokenImages",
};
const setProjectName = (pname) => ({
	type: Types.SET_PROJECT_NAME,
	payload: { pname },
});
const updateTokenImages = (urls) => ({
	type: Types.UPDATE_TOKEN_IMAGES,
	payload: { urls },
});

export { updateTokenImages, setProjectName, Types };
