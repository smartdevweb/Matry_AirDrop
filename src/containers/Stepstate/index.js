import React from "react";

import LanguageSelector from "../../components/LanguageSelector";
import NFTbuilder from "../../components/NFTbuilder";

export default function Stepstate() {
	return (
		<>
			<div className="d-none d-sm-flex flex-column justify-content px-3 align-items-center NFT-gradient">
				<div className="langselector" style={{ position: "relative" }}>
					<LanguageSelector />
				</div>
				<NFTbuilder />
			</div>
		</>
	);
}
