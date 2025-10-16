import React, { useState } from "react";
import SurveyComponent from "./SurveyComponent";
import InputText from '../../common/InputText.js';
import InputDate from '../../common/InputDate.js';
import InputFile from '../../common/InputFile.js';
import QuillTextArea from '../../common/QuillTextArea.js';
import SelectList from '../../common/SelectList.js';
import Checkbox from '../../common/Checkbox.js';
import RadioButtons from '../../common/RadioButtons.js';
import Tooltip from '../../common/Tooltip.js';
import { Pencil, Trash } from 'lucide-react';
import { Modal } from '../../common/Modal.js';
import Api from '../../../Api.js';

/**
 * survey object view component, to display the survey object in compact mode without edition
 * onSave : action called triggered when saved provided by the parent
 */
function SurveyComponentEditor({ surveyComponent,onSave,onDelete }) {
	const [editMode, setEditMode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	function edit() {
		setEditMode(true);
	}
	
	const handleYes = () => {
		//setHiddenAlert(true);
		Api.deleteSurveyComponent(surveyComponent.id).then((response) => {
			if (response) {
				setIsModalOpen(false);
				onDelete();
			//	setAlerts([{ message: "The survey component has been deleted", type: "success" }]);
				//fetchData(filter,projectId);
			}
		}).catch((error)=>{
			//setAlerts([{ message: "An error occured during survey deletion"+error, type: "error" }]);
		})

	};

	const handleNo = () => {
		setIsModalOpen(false);
	};
	

/**
 * when we save we call the parent action onSave
 */
	function save(){
		setEditMode(false);
		onSave();
	}

	function deleteComp() {
		setIsModalOpen(true);
	}
	
	function onCheckBoxChange(){
		
	}
	/** 
	 * transform values to a map prepared for the select list
	 */
	function valuesToMap(values) {
		var pMap = new Map();
		const arr = values.split(";");
		for (const element of arr) {
			pMap.set(element, element);
		}
		return pMap;

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
					<tr><td>Question type:</td><td>{surveyComponent.questionType}</td></tr>
					<tr><td>values:</td><td>{surveyComponent.values}</td></tr>
					<tr><td>position:</td><td>{surveyComponent.position}</td></tr>
					<tr><td>status:</td><td>{surveyComponent.status}</td></tr>
				</tbody></table>
		</div>;
	}

	return (
		<div className="">
		<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the component?" />
			
			{!editMode &&
				<div className="flex">
					<div className="flex">
						<div className="w-[1024px]" >
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 0) && <InputText name={surveyComponent.name} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 1) && <QuillTextArea name={surveyComponent.name} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 2) && surveyComponent.values&&<SelectList label={surveyComponent.name} values={valuesToMap(surveyComponent.values)} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 3) && <Checkbox name={surveyComponent.name} text={""} onValueChange={()=>onCheckBoxChange()} inline={true} />}
							
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 4) && <InputDate name={surveyComponent.name} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 5) && surveyComponent.values&&<RadioButtons label={surveyComponent.name} values={valuesToMap(surveyComponent.values)} text={""} onTextChange={""} inline={true} />}
							{(surveyComponent.type === 0) && (surveyComponent.questionType == 6) && <InputFile name={surveyComponent.name} text={""} onTextChange={""} inline={true} />}
							
							{(surveyComponent.type === 1) && <div className={surveyComponent.style}>{surveyComponent.name}</div>}
						</div>
						<div className="flex">
							<button name={"edit"} className="py-1 px-3 rounded" onClick={() => edit()}><Pencil size={18} color={"blue"} /></button>
							<button name={"delete"} className="py-1 px-3 rounded" onClick={() => deleteComp()}><Trash size={18} color={"red"} /></button>
						</div>
					</div>
					<Tooltip name="my tool" content={getMetaData()} />
				</div>
			}
			{editMode && <SurveyComponent surveyComponent={surveyComponent} onSave={() => save()} onCancel={() => setEditMode(false)} />}

		</div>);
}

export default SurveyComponentEditor;