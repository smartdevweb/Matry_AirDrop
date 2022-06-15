import React from "react";

const memoizedFunc = () => {
	function person(name, age, gender) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
	var person1 = new person("HH", 23, "ere");
	console.log(person1);
};

export default function Step3() {
	return (
		<>
			<button onClick={() => console.log(memoizedFunc())}>
				Press here
			</button>
		</>
	);
}
