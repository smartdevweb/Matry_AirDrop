import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";

import MetamaskIcon from "../../assets/images/wallet/metamask.png";
import TrustWalletIcon from "../../assets/images/wallet/trustWallet.png";
import WalletConnectIcon from "../../assets/images/wallet/walletConnectIcon.svg";
import Modal from "../../components/Modal";
import { injected, walletconnect } from "../../constants/web3";
import usePrevious from "../../hooks/usePrevious";
import { ApplicationModal } from "../../state/application/actions";
import {
	useModalOpen,
	useWalletModalToggle,
} from "../../state/application/hooks";

import "./WalletModal.css";

function Option({
	label,
	icon,
	optionConnector,
	addition,
	pending,
	setPending,
}) {
	const { account, connector, activate } = useWeb3React();
	const active =
		account && connector && connector === optionConnector && addition;
	return optionConnector === pending.connector &&
		addition === pending.addition ? (
		<div className="option_container d-flex align-items-center justify-content-start text-white rounded-3 px-5 py-1 my-4">
			<BiRefresh
				width={18}
				height={18}
				color="#1FE3CC"
				className="me-3"
			/>
			<span>Initializing...</span>
		</div>
	) : (
		<div
			className={`option_container d-flex align-items-center justify-content-between text-white rounded-3 px-5 py-1 my-4 cursor-pointer
          ${active ? "active" : ""}
        `}
			onClick={() => {
				if (pending.connector || active) return;
				setPending({
					connector: optionConnector,
					addition: addition,
				});
				activate(optionConnector, undefined).finally(() => {
					setPending({
						connector: null,
						addition: true,
					});
				});
			}}
		>
			<span>{label}</span>
			<img src={icon} width={18} height={18} alt="" />
		</div>
	);
}

export default function WalletModal() {
	const { account, connector, deactivate } = useWeb3React();
	const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
	const toggleWalletModal = useWalletModalToggle();
	const previousAccount = usePrevious(account);
	const [pending, setPending] = useState({
		connector: null,
		addition: true,
	});

	useEffect(() => {
		if (account !== previousAccount && walletModalOpen) {
			toggleWalletModal();
		}
	}, [account, previousAccount, toggleWalletModal, walletModalOpen]);

	useEffect(() => {
		if (account || !walletModalOpen) {
			setPending({
				connector: null,
				addition: true,
			});
		}
	}, [account, walletModalOpen]);

	const logout = () => {
		deactivate();

		if (typeof connector.close === "function") {
			connector.close();
		}
	};

	const Footer = () => {
		return (
			<div className="text-white" style={{ fontSize: 14 }}>
				Don&apos;t have a Wallet?
				<a
					href="https://metamask.io"
					target="_blank"
					rel="noreferrer"
					className="ms-1"
					style={{ color: "#1FE3CC" }}
				>
					Download Here
				</a>
			</div>
		);
	};

	return !account ? (
		<Modal
			title="Connect Wallet"
			hasClose={true}
			onClose={toggleWalletModal}
			show={walletModalOpen}
			ModalFooter={Footer}
		>
			<Option
				label="Metamask"
				icon={MetamaskIcon}
				optionConnector={injected}
				addition={window.ethereum && window.ethereum.isMetaMask}
				pending={pending}
				setPending={setPending}
			/>
			<Option
				label="TrustWallet"
				icon={TrustWalletIcon}
				optionConnector={injected}
				addition={window.ethereum && window.ethereum.isTrust}
				pending={pending}
				setPending={setPending}
			/>
			<Option
				label="WalletConnect"
				icon={WalletConnectIcon}
				optionConnector={walletconnect}
				addition={true}
				pending={pending}
				setPending={setPending}
			/>
		</Modal>
	) : (
		<Modal
			title="Your Wallet"
			hasClose={true}
			onClose={toggleWalletModal}
			show={walletModalOpen}
		>
			<div className="text-white text-break">{account}</div>
			<button
				className="rounded-pill btn btn-primary text-white fs-5 px-3 py-1 mt-3"
				onClick={logout}
			>
				Logout
			</button>
		</Modal>
	);
}
