import React from "react";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { setProjectName } from "../../../../state/createPage/actions";

import "./Step1.css";

function Step1() {
	const dispatch = useDispatch();
	const projectName = useSelector((state) => state.createPage.projectname);

	return (
		<>
			<div className="container d-flex flex-row justify-content-center align-items-center  div-input">
				<span className="inputIcon">
					<BsPencil style={{ color: "white" }} />
				</span>
				<input
					className="inputbox"
					type="text"
					name="projectName"
					placeholder={"Type your new project name here..."}
					maxlength="10"
					onChange={(e) => {
						dispatch(setProjectName(e.target.value));
					}}
					value={projectName}
				></input>
			</div>
		</>
	);
}
export default Step1;
