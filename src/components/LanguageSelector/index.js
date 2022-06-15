import React from "react";
import ReactFlagsSelect from "react-flags-select";

import "./LanguageSelector.css";

function LanguageSelector() {
	return (
		<ReactFlagsSelect
			selected={"US"}
			countries={["US", "FR"]}
			customLabels={{ US: "English (US)", FR: "French (FR)" }}
			className="lang-selector"
		/>
	);
}

export default LanguageSelector;
