import { useWeb3React } from "@web3-react/core";
import React from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { BsDroplet } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";

import { useLocation, useNavigate } from "react-router-dom";

import { isRightNetwork, shortenAddress } from "../../constants/utils";
import { useWalletModalToggle } from "../../state/application/hooks";
import dropimage from "../../assets/images/create/twodrops.png";

import "./Sidebar.css";

const LinkItems = [
	{
		icon: MdOutlineLibraryAdd,
		title: "Create",
		path: "/create",
	},
	{
		icon: GrMoney,
		title: "Stake",
		path: "/stake",
	},
	{
		icon: BsDroplet,
		title: "Pool",
		path: "/liquidity",
	},
	{
		icon: AiOutlineSwap,
		title: "Swap",
		path: "/swap",
	},
	{
		icon: RiGovernmentLine,
		title: "Vote",
		path: "/governance",
	},
];

const MenuItems = [
	{
		title: "Profile",
		path: "/profile",
	},
	{
		title: "Wallet",
		path: "/wallet",
	},
	{
		title: "Settings",
		path: "/settings",
	},
];

export default function Sidebar() {
	const { account, chainId } = useWeb3React();
	const toggleWalletModal = useWalletModalToggle();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div
			className="d-none d-sm-flex flex-column justify-content-between
		 px-3 sidebar"
		>
			<div className="logo">
				<img
					src={dropimage}
					alt="dropimage"
					style={{ height: "100%" }}
				/>
			</div>
			<div className="sidebar-linklist">
				{LinkItems.map((link, index) => (
					<div
						key={`sidebar-link-${index}`}
						className={`d-flex flex-row align-items-center gap-2 sidebar-link
						${pathname === link.path ? "sidebar-link-selected" : ""}`}
						onClick={() => {
							navigate(link.path);
						}}
					>
						<link.icon size={20} />
						<span>{link.title}</span>
					</div>
				))}
			</div>
			<div className="sidebar-menulist">
				{MenuItems.map((menu, index) => (
					<div
						key={`sidebar-menu-${index}`}
						className="sidebar-menu"
						onClick={() => {
							navigate(menu.path);
						}}
					>
						{menu.title}
					</div>
				))}
				{account ? (
					isRightNetwork(chainId) ? (
						<div
							className="sidebar-menu"
							onClick={toggleWalletModal}
							style={{ marginTop: "30px" }}
						>
							<img
								src={`https://ui-avatars.com/api/?background=4C06EB&color=fff&name=Nathanael`}
								alt="A"
								className="sidebar-menu-avatar"
							/>
							<span>{shortenAddress(account)}</span>
						</div>
					) : (
						<div className="sidebar-menu">Wrong Network</div>
					)
				) : (
					<div
						className="sidebar-menu"
						onClick={toggleWalletModal}
						style={{ marginTop: "30px" }}
					>
						Connect Wallet
					</div>
				)}
			</div>
			<div className="company_license">
				Developed by <b style={{ color: "white" }}>MATRY LABS</b>
			</div>
		</div>
	);
}
