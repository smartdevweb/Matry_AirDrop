import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from "../constants/web3";
import { getContract, isRightNetwork } from "../constants/utils";

export function useContract(address, ABI, withSignerIfPossible) {
	const { library, account } = useWeb3React();

	return useMemo(() => {
		if (!address || !ABI || !library) return null;
		try {
			return getContract(
				address,
				ABI,
				library,
				withSignerIfPossible && account ? account : undefined
			);
		} catch (error) {
			console.error("Failed to get contract", error);
			return null;
		}
	}, [address, ABI, library, withSignerIfPossible, account]);
}

export function useNFTContract(chainId, nftType) {
	const chain = isRightNetwork(chainId) ? chainId : 4;
	return useContract(
		CONTRACT_ADDRESSES[chain][nftType],
		CONTRACT_ABIS[nftType],
		true
	);
}
