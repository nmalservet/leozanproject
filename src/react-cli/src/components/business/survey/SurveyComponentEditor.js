import React, { useState } from "react";
import ActionButton from '../../common/ActionButton';
import SurveyComponent from "./SurveyComponent";
import InputText from '../../common/InputText.js';
import Tooltip from '../../common/Tooltip.js';
import { Pencil, Trash } from 'lucide-react';

/**
 * survey object view component, to display the survey object in compact mode without edition
 */
function SurveyComponentEditor({ surveyComponent }) {
	const [editMode, setEditMode] = useState(false);

	function edit() {
		setEditMode(true);
	}

	function deleteComp() {

	}

	function getMetaData() {
		return <div className="ml-10 grid grid-col-1 gap-1 m-2">
			<table class="table-auto">
				<thead>
					<tr><th>Attribute</th><th>Value</th></tr></thead>
				<tbody>
					<tr><td>id:</td><td>{surveyComponent.id}</td></tr>
					<tr><td>name:</td><td>{surveyComponent.name}</td></tr>
					<tr><td>style:</td><td>{surveyComponent.style}</td></tr>
					<tr><td>type:</td><td>{surveyComponent.type}</td></tr>
					<tr><td>position:</td><td>{surveyComponent.position}</td></tr>
					<tr><td>status:</td><td>{surveyComponent.status}</td></tr>
				</tbody></table>
		</div>;
	}

	return (
		<div className="">
			{!editMode &&
				<div className="flex">
					<div className="flex">
						<div className="w-[850px]" >
							{(surveyComponent.type === 0) && <InputText name={surveyComponent.name} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 1) && <div className={surveyComponent.style}>{surveyComponent.name}</div>}
						</div>
						<div>
							<button name={"edit"} className="py-1 px-3 rounded" onClick={() => edit()}><Pencil size={18} color={"blue"} /></button>
							<button name={"delete"} className="py-1 px-3 rounded" onClick={() => deleteComp()}><Trash size={18} color={"red"} /></button>
						</div>
					</div>
					<Tooltip name="my tool" content={getMetaData()} />
				</div>
			}
			{editMode && <SurveyComponent surveyComponent={surveyComponent} onSave={() => setEditMode(false)} onCancel={() => setEditMode(false)} />}

		</div>);
}

export default SurveyComponentEditor;