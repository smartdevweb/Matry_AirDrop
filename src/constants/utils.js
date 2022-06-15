import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";

import { SUPPORTED_CHAINIDS } from "./web3";

export const isRightNetwork = (chainId) => {
	return SUPPORTED_CHAINIDS.includes(chainId);
};

export const shortenAddress = (address) => {
	if (!address) return "";
	if (address.startsWith("0x")) {
		if (address.length < 12) return address;
		return address.slice(0, 6) + "..." + address.slice(-4);
	}
	if (address.length < 10) return address;
	return address.slice(0, 4) + "..." + address.slice(-4);
};

export function isAddress(value) {
	try {
		return getAddress(value);
	} catch {
		return false;
	}
}

export function getSigner(library, account) {
	return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
	return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
	if (!isAddress(address) || address === AddressZero) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}

	return new Contract(address, ABI, getProviderOrSigner(library, account));
}
