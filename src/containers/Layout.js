import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Footer from "../containers/Footer";
import Stepstate from "./Stepstate";
function Layout() {
	return (
		<div
			className="d-flex flex-row justify-content-between"
			style={{ flex: 1, backgroundColor: "#1D1E1F", minHeight: "100vh" }}
		>
			<Sidebar />
			<div
				className="d-flex flex-column justify-content-between"
				style={{ minWidth: "70%" }}
			>
				<Outlet />
				<Footer />
			</div>

			<Stepstate />
		</div>
	);
}

export default Layout;
