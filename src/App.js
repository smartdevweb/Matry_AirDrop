import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Modals from "./containers/Modals";
import Routes from "./containers/Routes";
import Updaters from "./containers/Updaters";
import configureStore from "./state";

function getLibrary(provider) {
	const library = new Web3Provider(provider, "any");
	library.pollingInterval = 15000;
	return library;
}

const reduxStore = configureStore();

function App() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<ReduxProvider store={reduxStore}>
				<Updaters />
				<Router>
					<Routes />
				</Router>
				<Modals />
			</ReduxProvider>
		</Web3ReactProvider>
	);
}

export default App;
