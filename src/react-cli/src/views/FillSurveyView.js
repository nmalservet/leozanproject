import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';
import SurveyFillable from '../components/business/survey/SurveyFillable';
import PatientBanner from "../components/business/PatientBanner.js";

/**
 * edit survey mode. to edit component
 */
export default function FillSurveyView() {
	//const navigation = useNavigation();

	const { surveyId, patientUuid } = useParams();
	const [survey, setSurvey] = useState(null);
	const [patient,setPatient] =useState(null);

	function loadData(id,patientUuid) {
		Api.getSurvey(id)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setSurvey(response.data);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
		loadPatient(patientUuid);
	}
	
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
	useEffect(() => {
		console.log("survey:" + surveyId);
		console.log("patient:" + patientUuid);
		if (surveyId != null)
			loadData(surveyId,patientUuid);
	}, [surveyId,patientUuid]);

	return (<div>
		{patient && <PatientBanner patient={patient} />}
		
		{survey != null && patientUuid!=null&&<SurveyFillable survey={survey} patientUuid={patientUuid}/>}
	</div>)

}