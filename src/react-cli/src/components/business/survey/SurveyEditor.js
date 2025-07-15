import React, { useState,useEffect } from "react";
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
	
	//load the components on startup
	useEffect(() => {
		refreshComponents();
	}, []);

	return (<div className="m-3 w-full"><h1>Survey Edition : {survey.name}</h1>

		<div>
			<hr />
			<div className="m-3">
				<div><b>Responsible :</b> {survey.responsible === 0 ? "Not yet defined" : survey.responsible}</div>
				<div><b>Unique Id</b> : {survey.id}</div>
			</div>
			<hr />
		</div>
		{(surveyComponents == null || surveyComponents.length === 0) && <div className="w-50 m-10 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">You must add your first component!</div>}
		<div className="m-6">
			{modalOpened === true && <SurveyComponentModal surveyId={survey.id} surveyComponent={{}} onClose={() => closeAddComponent()} />}

			<ActionButton name={"addComponent"} text={"Add a component"} onClick={() => addComponent()} />
		</div>

		{surveyComponents != null && surveyComponents.map(comp => <SurveyComponentEditor surveyComponent={comp} onSave={()=>refreshComponents()} onDelete={()=>refreshComponents()}/>)}
	</div>)
}


export default SurveyEditor;