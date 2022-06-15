import React from "react";

import { ProgressBar } from "react-bootstrap";
import { FaMinus } from "react-icons/fa";
import { useSelector } from "react-redux";

import TokenAvatar from "./TokenAvatar";

import "./NFTbuilder.css";

export default function NFTbuilder() {
	const pname = useSelector((state) => state.createPage.projectname);
	const tokenImages = useSelector((state) => state.createPage.urls);
	return (
		<div
			className="d-flex flex-column justify-content"
			style={{ width: "95%" }}
		>
			<div className="NFT-div">
				<h2>NFT Builder</h2>
				<div style={{ marginTop: "20px" }}>
					<ProgressBar
						variant="success"
						style={{ height: "0.4rem" }}
						now={
							pname && tokenImages.length > 0
								? 25
								: pname
								? 12.5
								: 0
						}
					/>
				</div>
			</div>
			<div className="NFT-span">
				{pname.length > 0 ? (
					<span className="project-name">{pname}</span>
				) : (
					<span className="project-name">
						<FaMinus className="faminus" />
					</span>
				)}
				<p className="NFT-p">Project name</p>
			</div>
			<TokenAvatar />
			<div className="NFT-span">
				<span className="project-name">
					<FaMinus className="faminus" />
				</span>
				<p className="NFT-p">Blockchain Network</p>
			</div>
			<div className="NFT-span">
				<span className="project-name">
					<FaMinus className="faminus" />
				</span>
				<p className="NFT-p">Marketplace</p>
			</div>
			<div className="NFT-span">
				<span className="project-name">
					<FaMinus className="faminus" />
				</span>
				<p className="NFT-p">mTokens</p>
			</div>

			<button className="NFT-mint-button" disabled="true">
				Mint NFT Collection
			</button>
		</div>
	);
}
