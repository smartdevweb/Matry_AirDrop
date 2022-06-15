import React from "react";
import { useNavigate } from "react-router-dom";

import "./Footer.css";

const FooterLinks = [
	{
		title: "Support",
		path: "/support",
	},
	{
		title: "Terms of use",
		path: "/terms",
	},
	{
		title: "About",
		path: "/about",
	},
	{
		title: "Legal stuff",
		path: "/legal",
	},
];

export default function Footer() {
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column align-items-center justify-content-center footer_center">
			<div
				className="d-flex flex-row align-items-center"
				style={{ padding: "10px" }}
			>
				{FooterLinks.map((link, index) => (
					<div
						key={`footer-link-${index}`}
						className={
							index + 1 === FooterLinks.length
								? "footer-link-last"
								: "footer-link"
						}
					>
						<span onClick={() => navigate(link.path)}>
							{link.title}
						</span>
					</div>
				))}
				<div style={{ color: "rgb(145,141,141)", padding: "0 35px" }}>
					Matry Labe &copy; 2022
				</div>
			</div>
		</div>
	);
}
