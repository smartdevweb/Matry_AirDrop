import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import TokenUpload from "../../../../components/TokenUpload";
import { updateTokenImages } from "../../../../state/createPage/actions";

import "./Step2.css";

function Step2() {
	const uplaodbtnLabel = ["Upload files", "Upload more files"];

	const dispatch = useDispatch();
	const refer = useRef(null);
	const [urls, setUrl] = useState([]);

	useEffect(() => {
		dispatch(updateTokenImages(urls));
	}, [urls, dispatch]);

	const setPath = (e) => {
		if (e.target.files && e.target.files[0]) {
			setUrl((urls) => [...urls, URL.createObjectURL(e.target.files[0])]);
		}
	};
	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setUrl((urls) => [
				...urls,
				URL.createObjectURL(e.dataTransfer.files[0]),
			]);
		}
		console.log(urls);
	};
	const removePath = (path) => {
		setUrl(urls.filter((item) => item !== path));
	};

	return (
		<div
			className="container d-flex flex-column justify-content-center  dragbox"
			onDragEnter={handleDrag}
			onDragLeave={handleDrag}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			<input
				type="file"
				className="input-box"
				ref={refer}
				onChange={setPath}
				accept=".png, .jpeg, .bmp"
			/>
			<div className=" d-flex flex-row flex-start img-box">
				{urls.length > 0
					? urls.map((url) => {
							return (
								<TokenUpload
									key={url}
									path={url}
									callback={removePath}
								/>
							);
					  })
					: null}
			</div>

			<div
				style={{ position: "relative" }}
				className="container d-flex flex-row justify-content-center align-items-center upload-btn"
			>
				<span
					className="upload-ltn upload"
					onClick={() => {
						refer.current.click();
					}}
				>
					<p style={{ margin: "13px" }}>
						{urls.length > 0
							? uplaodbtnLabel[1]
							: uplaodbtnLabel[0]}
					</p>
				</span>
				<span className="upload-rtn upload">
					<p className="triangle-down"></p>
				</span>
			</div>
			<div className=" d-flex  justify-content-center upload-hint ">
				<p
					style={{
						fontSize: "17px",
						color: "grey",
						margin: "12px",
					}}
				>
					or Drag &amp; Drop files here to{" "}
					{urls.length > 0 ? `continue` : `begin`} uploading
				</p>
			</div>
		</div>
	);
}
export default Step2;
