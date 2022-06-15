import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import ERC721_ABI from "./ERC721.json";
import ERC1155_ABI from "./ERC1155.json";

export const SUPPORTED_CHAINIDS = [
	//137, // POLYGON,
	//80001, // MUMBAI,
	4, // RINKEBY,
];

export const injected = new InjectedConnector();

export const walletconnect = new WalletConnectConnector({
	rpc: {
		137: "https://polygon-rpc.com",
		80001: "https://matic-mumbai.chainstacklabs.com	",
	},
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: 15000,
});

export const CONTRACT_ADDRESSES = {
	4: {
		ERC721: "0xd39a420A9823599D4c2AE0aD459c551Db2d883C4",
		ERC1155: "0x641857Ac34dd7E4a42cD6fEC16Ae5013df05Cd5c",
	},
};

export const CONTRACT_ABIS = {
	ERC721: ERC721_ABI,
	ERC1155: ERC1155_ABI,
};
