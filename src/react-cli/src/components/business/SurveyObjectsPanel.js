import React,{useState} from 'react';
import SurveyObject from './SurveyObject';
import SurveyObjectView from './SurveyObjectView';
import ActionButton from '../common/ActionButton';
/**
 * Display the panel for survey objects
 */
export default function SurveyObjectsPanel({ surveyId,  onClose }) {
	
	const [showForm, setShowForm] = useState(false);
	const [surveyObjects,setSurveyObjects] = useState([]);//array of survey objects for the survey
	
	
	function openFormSurveyObject(){
		console.log("ok open form");
		setShowForm(true);
	}

	return (
		<div className="">
			<h1>Components</h1>
			{surveyObjects.map(surveyObject=><SurveyObjectView surveyObject={surveyObject} />)}
			
			{showForm&&<SurveyObject initialSurveyObject={{}}/>}
			<ActionButton name={"addComponent"} text={"Add a component"} onClick={()=>openFormSurveyObject()}/>
		</div>
	);
}