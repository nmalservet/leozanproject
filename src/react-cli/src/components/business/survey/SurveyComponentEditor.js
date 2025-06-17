import React, { useState } from "react";
import ActionButton from '../../common/ActionButton';
import SurveyComponent from "./SurveyComponent";
import InputText from '../../common/InputText.js';

/**
 * survey object view component, to display the survey object in compact mode without edition
 */
function SurveyComponentEditor({ surveyComponent }) {
	const [editMode,setEditMode]=useState(false);
	
	function edit() {
		setEditMode(true);
	}
	
	function deleteComp(){
		
	}

	return (
		<div className="">
			<h1>Survey Component #{surveyComponent.id}</h1>
			{!editMode&&
				<div>
				<div>
				<div className="font-bold ml-4"></div>
				{(surveyComponent.type==0)&&<InputText name={surveyComponent.name} text={""} onTextChange={""} inline={true}/>}
				</div>
				<div className="ml-10 grid grid-col-1 gap-1 m-2">
					<table class="table-auto">
						<thead>
							<tr><th>Attribute</th><th>Value</th></tr></thead>
						<tbody>
							<tr><td>name:</td><td>{surveyComponent.name}</td></tr>
							<tr><td>style:</td><td>{surveyComponent.style}</td></tr>
							<tr><td>type:</td><td>{surveyComponent.type}</td></tr>
							<tr><td>position:</td><td>{surveyComponent.position}</td></tr>
							<tr><td>status:</td><td>{surveyComponent.status}</td></tr>
						</tbody></table>
				</div>
				</div>
			}
			{editMode&&<SurveyComponent surveyComponent={surveyComponent} onSave={()=>setEditMode(false)}/>}
			<ActionButton name={"edit"} text={"Edit"} onClick={() => edit()} />
			<ActionButton name={"delete"} text={"Delete"} onClick={() => deleteComp()} />
		</div>);
}

export default SurveyComponentEditor;