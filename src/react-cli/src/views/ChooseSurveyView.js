import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';
import ProjectsSelectList from "../components/business/ProjectsSelectList.js";
import SurveysSelectList from "../components/business/SurveysSelectList.js";
import ActionButton from "../components/common/ActionButton.js";
import { useNavigate } from "react-router-dom";
import PatientBanner from "../components/business/PatientBanner.js";

/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function ChooseSurveyView() {
	const { patientUuid } = useParams();
	const [patient, setPatient] = useState(null);
	const [projectId, setProjectId] = useState(null);
	const [surveyId, setSurveyId] = useState(null);
	const navigate = useNavigate();

	//load projects

	function loadPatient(uuid) {
		Api.getPatient(uuid)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setPatient(response.data);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	
	/**
	 * go to fill the survey choosen
	 */
	function fillSurvey(){
		navigate('/fillSurvey/'+patientUuid+'/'+surveyId);
	}


	useEffect(() => {
		if (patientUuid != null)
			loadPatient(patientUuid);
	}, [patientUuid]);

	return (<div className="m-4">
		<div>{
			patient && <PatientBanner patient={patient}/>}</div>
		<hr />
		<div className="flex"><span className="font-bold">1 - Choisissez un projet :</span><div className="ml-5"> <ProjectsSelectList selected={projectId} onSelection={setProjectId} /></div></div>
		{projectId && <div className="flex"><span className="font-bold">2 - Choisissez un questionnaire : </span><div className="ml-5"> <SurveysSelectList projectId={projectId} selected={surveyId} onSelection={setSurveyId} /></div></div>}
		{surveyId && <ActionButton name={"fillSurvey"} text={"Renseigner le questionnaire"} onClick={() => fillSurvey()} />}
	</div>

	);
}