import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import InputText from '../common/InputText.js';
import InputDate from '../common/InputDate.js';
import ActionButton from '../common/ActionButton.js';
import SecondaryActionButton from '../common/SecondaryActionButton.js';

/**
 * filter to be apply on patients
 */
function PatientFilter({ onApplyFilter }) {
	const { t } = useTranslation();
	//we set the messages to an empty array if clicked.
	const [name, setName] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [ssn, setSsn] = useState(null);
	const [mrn, setMrn] = useState(null);
	const [birthdateFrom, setBirthdateFrom] = useState(null);
	const [birthdateTo, setBirthdateTo] = useState(null);


	/* on search click set the filter to the parent.*/
	function search() {
		var filter = {};
		if (name&&name.length>0)
			filter.name = name;
		if (firstName&&firstName.length>0)
			filter.firstName = firstName;
		if (ssn&&ssn.length>0)
			filter.ssn = ssn;
		if (mrn&&mrn.length>0)
			filter.mrn = mrn;
		if (birthdateFrom&&birthdateFrom.length>0)
			filter.birthdateFrom = birthdateFrom;
		if (birthdateTo&&birthdateTo.length>0)
			filter.birthdateTo = birthdateTo;
		onApplyFilter(filter);
	}

	/**
	 * reset all fields values
	 */
	function reset(){
		setName('');
		setFirstName('');
		setSsn('');
		setMrn('');
		setBirthdateFrom('');
		setBirthdateTo('');
	}

	return (
		<div className="h-40 overflow-y-auto">
			<div className="grid grid-cols-4 content-start gap-4 ">
				<InputText name={t("patient.name")} text={name} onTextChange={setName} inline={true}></InputText>
				<InputText name={t("patient.firstName")} text={firstName} onTextChange={setFirstName} inline={true}></InputText>
				<InputText name={"SSN"} text={ssn} onTextChange={setSsn} inline={true}></InputText>
				<InputText name={"MRN"} text={mrn} onTextChange={setMrn} inline={true}></InputText>
				<InputDate name={t("patient.birthdate") + " (" + t("common.from") + ")"} text={birthdateFrom} onTextChange={setBirthdateFrom} inline={true}></InputDate>
				<InputDate name={t("patient.birthdate") + " (" + t("common.to") + ")"} text={birthdateTo} onTextChange={setBirthdateTo} inline={true}></InputDate>
			</div>
			<div className="flex  m-2 items-center">
				<SecondaryActionButton text={t("common.resetFilter")} onClick={() => reset()}/>
				<div className="ml-10">
				<ActionButton text={t("common.search")} onClick={() => search()}/>
				</div>
			</div>
		</div>
	)
}

export default PatientFilter;