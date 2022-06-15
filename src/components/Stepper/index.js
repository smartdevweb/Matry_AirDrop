import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import FAQ from "../FAQ";

import "./Stepper.css";
export default function Stepper({ steps, labels, Components }) {
	const [active, setActive] = React.useState(0);
	const CurStep = Components[active];
	const PrevButton = ({ label, alone }) => {
		return (
			<div
				className={
					alone === false
						? "align-items-center spanicon stepbtn-prev"
						: "align-items-center spanicon"
				}
				onClick={() => {
					if (active > 0) {
						setActive(active - 1);
					}
				}}
			>
				<div className="wizard-border">
					<span>
						<AiOutlineLeft />
					</span>
					<span className="underline">{label}</span>
				</div>
			</div>
		);
	};
	const NextButton = ({ label, alone }) => {
		return (
			<div
				className={
					alone === false
						? "align-items-center spanicon stepbtn-next"
						: "align-items-center spanicon"
				}
				onClick={() => {
					if (active < Components.length) {
						setActive(active + 1);
					}
				}}
			>
				<div className="wizard-border">
					<span className="underline">{label}</span>
					<span>
						<AiOutlineRight />
					</span>
				</div>
			</div>
		);
	};
	const Split = () => {
		return <span style={{ fontSize: "25px", margin: "0 20px" }}>|</span>;
	};

	return (
		<>
			<div
				className="container d-flex flex-row justify-content-center align-items-center "
				style={{ marginTop: "50px" }}
			>
				{steps.map((stepLabel, index) => (
					<span
						key={index}
						className={
							((active === 0 && index === 0) ||
							(active > 0 && index + 1 === active)
								? `step-tab-active `
								: `step-tab-deactive `) +
							(index === 0
								? `step-first`
								: index === steps.length - 1
								? `step-final`
								: `step-middle`)
						}
					>
						<p className="label">
							{index + 1}&nbsp;)&nbsp;{stepLabel}
						</p>
					</span>
				))}
			</div>
			<h1 className="step-mark">Create</h1>
			<CurStep />

			<div className=" d-flex  justify-content-center align-items-center wizard">
				{active > 0 && (
					<PrevButton
						label={labels[active - 1]}
						alone={active === Components.length - 1}
					/>
				)}
				{active > 0 && active < Components.length - 1 && <Split />}
				{active < Components.length - 1 && (
					<NextButton
						label={labels[active + 1]}
						alone={active === 0}
					/>
				)}
			</div>

			{active === 0 ? <FAQ /> : null}
		</>
	);
}
