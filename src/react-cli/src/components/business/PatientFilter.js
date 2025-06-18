import React, { useState } from "react";
import InputText from '../common/InputText.js';
import ActionButton from '../common/ActionButton.js';
import SecondaryActionButton from '../common/SecondaryActionButton.js';

/**
 * filter to be apply on patients
 */
function PatientFilter({ onApplyFilter }) {
	//we set the messages to an empty array if clicked.
	const [name, setName] = useState(null);
	

	/* on search click set the filter to the parent.*/
	function search() {
		var filter = {};
		if (name&&name.length>0)
			filter.name = name;
		onApplyFilter(filter);
	}
	
	/**
	 * reset all fields values
	 */
	function reset(){
		setName('');
	}

	return (
		<div className="h-40 overflow-y-auto">
			<div className="grid grid-cols-4 content-start gap-4 ">
				<InputText name={"Name"} text={name} onTextChange={setName} inline={true}></InputText>				
			</div>
			<div className="flex  m-2 items-center">
				<SecondaryActionButton text={"Reset filter"} onClick={() => reset()}/>
				<div className="ml-10">
				<ActionButton text={"Search"} onClick={() => search()}/>
				</div>
			</div>
		</div>
	)
}

export default PatientFilter;