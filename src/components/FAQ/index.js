import React from "react";
import { IoMdClose } from "react-icons/io";

import img from "../../assets/images/create/placeholder.png";

import "./FAQ.css";

const HelpImgs = [
	{
		label: "NFT Creation with Matry",
		path: img,
	},
	{
		label: "What are mTokens?",
		path: img,
	},
	{
		label: "Pass Quality Assurance",
		path: img,
	},
];

function FAQ() {
	return (
		<>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<div className="hint">Helpful Suggestions</div>

				<div className="container d-flex flex-row justify-content-between align-items-center ">
					<div className="container d-flex  justify-content-center flex-row">
						{HelpImgs.map((item, index) => (
							<div className="image-div" key={index}>
								<img
									src={item.path}
									className="image-wrap"
									alt="helpimg"
								></img>
								<span className="image-text">{item.label}</span>
								<span className="image-close">
									<IoMdClose
										style={{
											color: "white",
											fontSize: "40px",
										}}
									/>
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default FAQ;
