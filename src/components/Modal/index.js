import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

import "./Modal.css";

function CloseButton({ onClick }) {
	return (
		<div
			className="cursor-pointer close-button rounded-circle d-flex align-items-center justify-content-center"
			onClick={onClick}
		>
			<MdClose />
		</div>
	);
}

function Modal({ title, children, hasClose, onClose, show, ModalFooter }) {
	const handleClick = (e, callback) => {
		e.stopPropagation();
		if (callback) callback();
	};

	useEffect(() => {
		if (show) document.body.className = "overflow-hidden";
		else document.body.className = "";
	}, [show]);

	return (
		show && (
			<div
				className="modal_overlay position-fixed start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center"
				onClick={(e) => handleClick(e, onClose)}
			>
				<div
					className="modal_container rounded-3 mx-3 w-100 max-w-2xl"
					onClick={(e) => handleClick(e)}
				>
					<div className="text-white d-flex align-items-center justify-content-between px-5 py-3 ">
						<span>{title}</span>
						{hasClose && (
							<CloseButton
								onClick={(e) => handleClick(e, onClose)}
							/>
						)}
					</div>
					<div className="modal_divider" />
					<div className="p-4">{children}</div>
					<div className="modal_divider" />
					{ModalFooter && (
						<div className="px-5 py-3">
							<ModalFooter />
						</div>
					)}
				</div>
			</div>
		)
	);
}

export default Modal;
