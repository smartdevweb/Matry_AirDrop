import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiCheckCircle } from "react-icons/hi";

import "./TokenUpload.css";

export default function TokenUpload({ path, callback }) {
	return (
		<div
			className=" d-flex flex-column flex-start avatar"
			style={{ marginTop: "15px", marginRight: "29px" }}
		>
			<div>
				<img src={path} alt="non_image" className="avatar-img" />
			</div>
			<div>
				<input
					className="avatar-input"
					type="text"
					placeholder="Enter name..."
				></input>
			</div>

			<div className="avatar-icon-box">
				<HiCheckCircle className="avatar-icon" />
				<AiFillCloseCircle
					className="avatar-icon"
					onClick={() => callback(path)}
				/>
			</div>
		</div>
	);
}
