import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Api from '../Api.js';
import ProjectsSelectList from "../components/business/projects/ProjectsSelectList.js";
import SurveysSelectList from "../components/business/SurveysSelectList.js";
import ActionButton from "../components/common/ActionButton.js";
import { useNavigate } from "react-router-dom";
import PatientBanner from "../components/business/PatientBanner.js";

/**
 *
 * @returns display the search filter with multiple dynamic fields
 */
export default function ChooseSurveyView() {
	const { t } = useTranslation();
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
		<div className="flex"><span className="font-bold">{t('chooseSurvey.step1')}</span><div className="ml-5"> <ProjectsSelectList selected={projectId} onSelection={setProjectId} /></div></div>
		{projectId && <div className="flex"><span className="font-bold">{t('chooseSurvey.step2')} </span><div className="ml-5"> <SurveysSelectList projectId={projectId} selected={surveyId} onSelection={setSurveyId} /></div></div>}
		{surveyId && <ActionButton name={"fillSurvey"} text={t('chooseSurvey.fillSurvey')} onClick={() => fillSurvey()} />}
	</div>

	);
}