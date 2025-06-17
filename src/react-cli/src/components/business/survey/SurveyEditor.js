import React, { useState } from "react";
import ActionButton from '../../common/ActionButton';
import SurveyComponentModal from "./SurveyComponentModal";
import SurveyComponentEditor from "./SurveyComponentEditor";
import Api from '../../../Api.js';
/**
 * main component to edit a survey
 */
function SurveyEditor({ survey }) {
	const [modalOpened, setModalOpened] = useState(false);

	const [surveyComponents, setSurveyComponents] = useState([]);//array of survey objects for the survey

	//refresh the rendering
	function refreshComponents() {
		console.log("refresh rendering?");
		Api.getSurveyObjects(survey.id)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setSurveyComponents(response.data);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	/**
	 * function to add a component. open the modal window to add a component
	 */
	function addComponent() {
		setModalOpened(true);
	}

	function closeAddComponent() {
		setModalOpened(false);
		refreshComponents();
	}

	return (<div><h1>Survey Editor</h1>

		<div>
			<div>Survey : {survey.name}</div>
			<div>Responsible : {survey.responsible}</div>
			<div>id : {survey.id}</div>
		</div>
		<div>
			{modalOpened === true && <SurveyComponentModal surveyId={survey.id} surveyComponent={{}} onClose={() => closeAddComponent()} />}

			<ActionButton name={"addComponent"} text={"Add a component"} onClick={() => addComponent()} />
		</div>

		{surveyComponents != null && surveyComponents.map(comp => <SurveyComponentEditor surveyComponent={comp} />)}
	</div>)
}


export default SurveyEditor;