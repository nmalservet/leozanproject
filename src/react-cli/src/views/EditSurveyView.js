import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';


import SurveyEditor from '../components/business/survey/SurveyEditor';

/**
 * edit survey mode. to edit component
 */
export default function EditSurveyView() {
	const { surveyId } = useParams();
	const [survey, setSurvey] = useState(null);


	function loadData(id) {
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
	}
	useEffect(() => {
		if (surveyId != null)
			loadData(surveyId);
	}, [surveyId]);

	return (<div>
		{survey != null && <SurveyEditor survey={survey} />}
	</div>)

}