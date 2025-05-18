import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';

import SurveyComponentsPanel from '../components/business/survey/SurveyComponentsPanel.js';

/**
 * edit survey mode. to edit component
 */
export default function EditSurveyView() {
	const { surveyId } = useParams();
	const [survey, setSurvey] = useState(null)

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

	return (<> {survey != null &&
		<div>
			<div className="width-1/2 border-r-4 float-left">
				<div>
					<div>Survey : {survey.name}</div>
					<div>Responsible : {survey.responsible}</div>
					
					<div>id : {survey.id}</div>
				</div>
				{survey.id && <SurveyComponentsPanel surveyId={survey.id} />}
			</div>
			<div className="width-1/2 float-right">
				<div><h1>Preview</h1></div>
			</div>
			<div>

			</div>
		</div>

	}</>

	);
}