import React, { useEffect, useState } from "react";
import Api from '../../../Api.js';
import SurveyComponentPreview from "./SurveyComponentPreview";
/**
 * survey preview display the survey in preview mode.
 * For each component display component preview
 */
function SurveyPreview({ survey}) {
	
	const [surveyComponents,setSurveyComponents] = useState([]);//array of survey objects for the survey
	
	//refresh the rendering
	function refreshPreview() {
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
	
	
		return (
		<div >
				<h1>Survey #{survey.id}</h1><button className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-bold py-1 px-3 rounded ml-10" onClick={() => refreshPreview()}>Refresh preview</button>
				<div>Responsible :{survey.responsible}</div>
				{surveyComponents!=null&&surveyComponents.map(comp=><SurveyComponentPreview surveyComponent={comp}/>)}
		</div>);
	}
export default SurveyPreview;