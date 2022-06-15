import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";

import "./TokenAvatar.css";
export default function TokenAvatar() {
	const avatarUrl = useSelector((state) => state.createPage.urls);
	return (
		<div
			className="NFT-span"
			style={{ position: "relative", height: "50px" }}
		>
			<div className="thumbnail">
				{avatarUrl.map((url, index) => {
					if (index < 4) {
						return (
							<img
								key={index}
								src={url}
								style={{
									maxHeight: "35px",
									marginRight: "3px",
									maxWidth: "20%",
								}}
								alt="No Avatar"
							/>
						);
					}
					return null;
				})}
			</div>

			{avatarUrl.length > 3 ? (
				<AiOutlineRight className="arrow2" />
			) : null}
			{avatarUrl.length > 0 ? null : (
				<span className="project-name">
					<FaMinus className="faminus" />
				</span>
			)}
			<p className="NFT-p">Uploads</p>
		</div>
	);
}
