import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import InputText from '../common/InputText.js';
import ActionButton from '../common/ActionButton.js';
import SecondaryActionButton from '../common/SecondaryActionButton.js';

/**
 * filter to be apply on patients
 */
function SurveyFilter({ onApplyFilter }) {
	const { t } = useTranslation();
	//we set the messages to an empty array if clicked.
	const [id, setId] = useState('');
	const [topic, setTopic] = useState('');
	const [description, setDescription] = useState('');
	const [statuses, setStatuses] = useState([]);

	/* on search click set the filter to the parent.*/
	function search() {
		var filter = {};
		if (id != null)
			filter.id = id;
		if (topic&&topic.length>0)
			filter.name = topic;
		if (description&&description.length>0)
			filter.description = description;
		if (statuses != null) {
			//var statuses = [];
			//statuses.push(status);
			filter.status = statuses;//this is a list.
		}
		onApplyFilter(filter);
	}
	
	/**
	 * reset all fields values
	 */
	function reset(){
		setId('');
		setTopic('');
		setStatuses([]);
		setDescription('');
	}

	return (
		<div className="h-40 overflow-y-auto">
			<div className="grid grid-cols-4 content-start gap-4 ">
				<InputText name={t("common.id")} text={id} onTextChange={setId} inline={true}></InputText>
				<InputText name={t("survey.topic")} text={topic} onTextChange={setTopic} inline={true}></InputText>
				<InputText name={t("common.description")} text={""} onTextChange={setDescription} inline={true}></InputText>
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

export default SurveyFilter;