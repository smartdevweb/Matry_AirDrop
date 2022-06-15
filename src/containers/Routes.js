import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Create from "../pages/Create";

import Layout from "./Layout";

export default function CustomRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/create" exact element={<Create />} />
				<Route index element={<Navigate replace to="/create" />} />
				<Route path="*" element={<Navigate replace to="/create" />} />
			</Route>
		</Routes>
	);
}
