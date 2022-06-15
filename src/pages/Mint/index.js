import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { isRightNetwork } from "../../constants/utils";
import { useNFTContract } from "../../hooks/useContract";

import "./Mint.css";

export default function MintPage() {
	const [file, setFile] = React.useState({});
	const fileOpen = React.useRef(null);
	const [uploadToastShow, setUploadToastShow] = React.useState(false);
	const [title, setTitle] = React.useState();
	const [description, setDescription] = React.useState();
	const [nftType, setNFTType] = React.useState("ERC721");
	const [quantity] = React.useState(1);
	const [socialMediaURL, setSocialMediaURL] = React.useState();

	const { account, chainId } = useWeb3React();

	const erc721 = useNFTContract(chainId, "ERC721");
	const erc1155 = useNFTContract(chainId, "ERC1155");
	const [txHash, setTxHash] = React.useState("");
	const [txFailed, setTxFailed] = React.useState(false);

	const uploadFile = (e) => {
		setFile({
			upload: true,
		});
		const payload = new FormData();
		payload.append("file", e.target.files[0]);
		axios
			.post("https://api.pinata.cloud/pinning/pinFileToIPFS", payload, {
				maxContentLength: "Infinity",
				headers: {
					"Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
					pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
					pinata_secret_api_key:
						process.env.REACT_APP_PINATA_SECRET_API_KEY,
				},
			})
			.then(function (response) {
				setFile({
					upload: false,
					link:
						"https://gateway.pinata.cloud/ipfs/" +
						response.data.IpfsHash,
					size: response.data.PinSize,
					name: e.target.files[0].name,
				});
				setUploadToastShow(true);
			})
			.catch(function (error) {
				console.log(error);
				setFile({
					upload: false,
				});
			});
	};

	const formatFileSize = (size) => {
		if (size < 1024) return size + " B";
		if (size < 1024 * 1024)
			return Math.floor((size / 1024) * 100) / 100 + " KB";
		return Math.floor((size / (1024 * 1024)) * 100) / 100 + " MB";
	};

	const TryMint = () => {
		if (title === undefined) setTitle("");
		if (description === undefined) setDescription("");

		if (!file.link || !title || !description) {
			return;
		}

		const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
		return axios
			.post(
				url,
				{
					title: title,
					description: description,
					asset: file.link,
					social: socialMediaURL,
				},
				{
					headers: {
						pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
						pinata_secret_api_key:
							process.env.REACT_APP_PINATA_SECRET_API_KEY,
					},
				}
			)
			.then(function (response) {
				Mint(response.data.IpfsHash);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const Mint = async (uri) => {
		try {
			let tx;
			if (nftType === "ERC721") {
				tx = await erc721.mint(
					account,
					"https://gateway.pinata.cloud/ipfs/" + uri
				);
			} else {
				tx = await erc1155.mint(account, quantity, uri);
			}
			tx = await tx.wait(1);
			setTxHash(tx.transactionHash);
		} catch (error) {
			console.log(error);
			setTxFailed(true);
		}
	};

	return (
		<div className="d-flex flex-column">
			<div className="mint_header position-relative overflow-hidden">
				<div className="container-sm d-flex flex-column">
					<span className="fs-2 text-white mb-3">
						<b>NFT</b> Minter
					</span>
					<span className="fs-5 text-white text-opacity-75 mb-5">
						Mint NFT on Matry at speed of light!
					</span>
				</div>
			</div>
			<div className="mint_body">
				<div className="container-sm">
					<div className="mint_form position-relative overflow-hidden d-flex flex-column">
						<div className="mint_form_title fs-5 fw-bold px-4">
							Mint your NFT
						</div>
						<div className="bg-white p-4 d-flex flex-column flex-md-row gap-5">
							<div className="d-flex flex-column flex-fill">
								<span className="mint_form_field_title">
									Upload
								</span>
								<div className="mint_form_file_upload d-flex flex-column align-items-center justify-content-center">
									<span
										className="mint_form_field_title fw-normal text-decoration-underline"
										role="button"
										onClick={() => fileOpen.current.click()}
									>
										Browse File
									</span>
									<span className="text-secondary mt-3">
										Supports JPG, PNG and MP4 videos. Max
										file size : 10MB.
									</span>
									<input
										type="file"
										accept="audio/*, video/*, image/*, .html, .pdf"
										className="d-none"
										ref={fileOpen}
										onChange={uploadFile}
									/>
								</div>
								{(file.link || file.upload) && (
									<div className="mint_form_uploaded_image d-flex flex-row align-items-center gap-3 mt-4 p-2">
										{file.upload ? (
											<div
												className="spinner-border"
												role="status"
											></div>
										) : (
											<>
												<img
													src={file.link}
													alt="preview-img"
												/>
												<div className="d-flex flex-column">
													<span className="">
														{file.name}
													</span>
													<span className="text-secondary">
														{formatFileSize(
															file.size
														)}
													</span>
												</div>
											</>
										)}
									</div>
								)}
							</div>
							<div className="d-flex flex-column flex-fill">
								<span className="mint_form_field_title">
									Title
								</span>
								<input
									className={`form-control ${
										title === "" ? "is-invalid" : ""
									} px-3 py-2`}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<span className="mint_form_field_title mt-4">
									Description
								</span>
								<textarea
									className={`form-control ${
										description === "" ? "is-invalid" : ""
									} px-3 py-2`}
									style={{ minHeight: "100px" }}
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
								<div className="d-flex flex-column flex-sm-row mt-4 gap-3">
									<div className="d-flex flex-column flex-fill">
										<span className="mint_form_field_title">
											NFT Type
										</span>
										<div className="mint_form_field_nft_type d-flex flex-row gap-1">
											<button
												className={`${
													nftType === "ERC721"
														? "mint_form_field_btn_selected"
														: "mint_form_field_btn_unselected"
												} btn rounded-sm flex-fill`}
												onClick={() =>
													setNFTType("ERC721")
												}
											>
												ERC721
											</button>
											<button
												className={`${
													nftType === "ERC1155"
														? "mint_form_field_btn_selected"
														: "mint_form_field_btn_unselected"
												} btn rounded-sm flex-fill`}
												onClick={() =>
													setNFTType("ERC1155")
												}
											>
												ERC1155
											</button>
										</div>
									</div>
									<div className="d-flex flex-column flex-fill">
										<span className="mint_form_field_title">
											Quantity
										</span>
										<input
											className="form-control px-3 py-2"
											value="1"
											readOnly
										/>
									</div>
								</div>
								<span className="mint_form_field_title mt-4">
									Social Media URL
									<span className="text-secondary">
										&nbsp;(optional)
									</span>
								</span>
								<input
									className="form-control px-3 py-2"
									placeholder="https://twitter.com/example"
									value={socialMediaURL}
									onChange={(e) =>
										setSocialMediaURL(e.target.value)
									}
								/>
								{account ? (
									isRightNetwork(chainId) ? (
										<button
											className="btn btn-primary align-self-start mt-4"
											onClick={TryMint}
										>
											Mint
										</button>
									) : (
										<button
											className="btn btn-danger align-self-start mt-4"
											disabled
										>
											Wrong Network
										</button>
									)
								) : (
									<button
										className="btn btn-secondary align-self-start mt-4"
										disabled
									>
										Wallet Not Connected
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer className="p-3" position="bottom-end">
				<Toast
					show={uploadToastShow}
					onClose={() => setUploadToastShow(false)}
					autohide
					bg="primary"
				>
					<Toast.Body className="text-white">
						File uploaded to IPFS
					</Toast.Body>
				</Toast>
				<Toast
					show={txHash !== ""}
					onClose={() => setTxHash("")}
					autohide
					bg="success"
				>
					<Toast.Body>
						<a
							href={`https://rinkeby.etherscan.io/tx/${txHash}`}
							className="text-white text-decoration-none"
							target="_blank"
							rel="noreferrer"
						>
							Transaction Success
						</a>
					</Toast.Body>
				</Toast>
				<Toast
					show={txFailed}
					onClose={() => setTxFailed(false)}
					autohide
					bg="danger"
				>
					<Toast.Body className="text-white">
						Transaction Failed
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
}
