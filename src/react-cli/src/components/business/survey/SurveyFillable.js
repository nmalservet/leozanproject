import React, { useState, useEffect } from "react";
import SurveyComponentFillable from "./SurveyComponentFillable";
import Api from '../../../Api.js';
import AlertsPanel from "../../common/AlertsPanel";

import ActionButton from '../../common/ActionButton.js';
/**
 * main component to edit a survey
 */
function SurveyFillable({ survey, patientUuid }) {
	const [surveyComponents, setSurveyComponents] = useState([]);//array of survey objects for the survey
	const [answers, setAnswers] = useState([]);//answers is a list of pairs [surveyComponentId:answer]}
	const [surveyAnswersId, setSurveyAnswersId] = useState(null);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);

	function closeAlert() {
		setHiddenAlert(true);
	}

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


	//load the components on startup
	useEffect(() => {
		refreshComponents();
	}, []);

	function saveAnswer(surveyComponentId, answer) {
		//save the answer
		console.log("save answer:" + surveyComponentId + ":" + answer);
		var alreadyAdded = false;
		var newAnswers = [];//new objects to avoid issue with references not updated
		//if the answer already exists we override else we add
		for (const answer of answers) {
			//console.log(element);
			if (answer.surveyComponentId == surveyComponentId) {
				alreadyAdded = true;
				newAnswers.push({ "surveyComponentId": surveyComponentId, "value": answer });
			}
			else
				newAnswers.push(answer);
		}
		if (alreadyAdded == false)
			newAnswers.push({ "surveyComponentId": surveyComponentId, "value": answer });

		setAnswers(newAnswers);
	}

	function saveForm() {
		console.log("save form");
		console.log("pat:"+patientUuid);
		setHiddenAlert(false);
		var surveyAnswers = {};
		var errorsForm = 0;
		surveyAnswers.surveyId = survey.id;
		surveyAnswers.patientUuid = patientUuid;
		surveyAnswers.answers = answers;
		//case create or update 
		if (errorsForm === 0) {
			if (surveyAnswersId != null) {
				Api.updateAnswers(surveyAnswers)
					.then((response) => {
						if (response !== undefined) {
							console.log("Updated ok");
							//we must create a new refernce for the array to be able to refresh the component
							//setSurveyComponents(response.data);
							//setSurveyAnswersId(response.data.id);
							setAlerts([{ message: "The survey has been updated", type: "success" }]);
						}
					})
					.catch((error) => {
						(console.error(error))
					});
			} else
				Api.saveAnswers(surveyAnswers)
					.then((response) => {
						if (response !== undefined) {
							//we must create a new refernce for the array to be able to refresh the component
							//setSurveyComponents(response.data);
							setSurveyAnswersId(response.data.id);
							setAlerts([{ message: "The survey has been saved", type: "success" }]);
						}
					})
					.catch((error) => {
						(console.error(error))
					});
		}
	}

	return (<div className="m-3 w-full"><h1>Survey : {survey.name}</h1>

		<div>
			<hr />
			<div className="m-3">
				<div><b>Responsible :</b> {survey.responsible === 0 ? "Not yet defined" : survey.responsible}</div>
				<div><b>Unique Id</b> : {survey.id}</div>
			</div>
			<hr />
		</div>
		{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
		{(surveyComponents == null || surveyComponents.length === 0) && <div className="w-50 m-10 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">You must add your first component!</div>}
		{surveyComponents != null && surveyComponents.map(comp => <SurveyComponentFillable surveyComponent={comp} onSave={saveAnswer} />)}

		<ActionButton name={"saveForm"} text={"Save"} onClick={() => saveForm()} />
	</div>)
}


export default SurveyFillable;