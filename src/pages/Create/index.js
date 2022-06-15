import React from "react";

import Stepper from "../../components/Stepper";

import Step1 from "./Containers/Step1";
import Step2 from "./Containers/Step2";
import step3 from "./Containers/step3";
import "./Create.css";

function Create() {
	return (
		<>
			<div className="d-flex flex-column flex-start item-align-center main-div">
				<Stepper
					steps={[
						"Add metadata",
						"Select network",
						"Choose a marketplace",
						"Assign mTokens",
					]}
					labels={[
						"Go to Project Name",
						"Go to Uploader",
						"Go to Select network",
						"Go to Choose a marketplace",
						"Go to Assign meTokens",
					]}
					Components={[Step1, Step2, step3, Step2, Step2]}
				/>
			</div>
		</>
	);
}

export default Create;
