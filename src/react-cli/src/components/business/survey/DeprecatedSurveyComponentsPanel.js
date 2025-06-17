import React,{useState} from 'react';
import SurveyComponent from './SurveyComponent';
import SurveyComponentPreview from './SurveyComponentPreview';

/**
 * Display the panel for survey objects
 */
export default function SurveyComponentsPanel({ surveyId,  onClose }) {
	
	const [showForm, setShowForm] = useState(false);
	const [surveyComponents,setSurveyComponents] = useState([]);//array of survey objects for the survey
	
	
	function openFormSurveyObject(){
		console.log("ok open form");
		setShowForm(true);
	}

	return (
		<div className="">
			<h1>Components</h1>
			{surveyComponents.map(surveyComponent=><SurveyComponentPreview surveyComponent={surveyComponent} />)}
			
			{showForm&&<SurveyComponent surveyId={surveyId} initialSurveyComponent={{}}/>}
			
		</div>
	);
}