import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';
import SurveyResponse from '../components/business/survey/SurveyResponse.js';
import PatientBanner from "../components/business/PatientBanner.js";

/**
 * fview survey answers
 */
export default function ViewSurveyAnswersView() {

	const { surveyResponseId } = useParams();//get the surveyAnswersId
	const [surveyResponse, setSurveyResponse] = useState(null);

	function loadData(id) {
		Api.getSurveyResponse(id)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setSurveyResponse(response.data);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	useEffect(() => {
		console.log("load survey response:"+surveyResponseId);
		if (surveyResponseId != null)
			loadData(surveyResponseId);
	}, [surveyResponseId]);

	return (<div>
		{surveyResponse && <PatientBanner patient={surveyResponse.patient} />}
		
		{surveyResponse &&<SurveyResponse surveyResponse={surveyResponse} />}
	</div>)

}