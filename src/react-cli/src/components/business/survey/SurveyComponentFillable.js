import React, { useState } from "react";
import InputText from '../../common/InputText.js';
import InputDate from '../../common/InputDate.js';
import InputFile from '../../common/InputFile.js';
import QuillTextArea from '../../common/QuillTextArea.js';
import SelectList from '../../common/SelectList.js';
import Checkbox from '../../common/Checkbox.js';
import RadioButtons from '../../common/RadioButtons.js';
/**
 * survey object view component, to display the survey object in compact mode without edition
 * onSave : action called triggered when saved provided by the parent : onSave(surveyComponentId,answer)
 */
function SurveyComponentFillable({ surveyComponent ,onSave}) {
	
	const [answer, setAnswer] = useState(null);

	function onCheckBoxChange() {

	}
	
	function save(value){
		console.log("save:"+surveyComponent.id+":"+value);
		onSave(surveyComponent.id,value);
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

	return (
		<div className="">
			<div className="flex">
				<div className="flex">
					<div className="w-[850px] m-1" >
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 0) && <InputText name={surveyComponent.name} text={answer} onTextChange={save} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 1) && <QuillTextArea name={surveyComponent.name} text={answer} onTextChange={save} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 2) && surveyComponent.values && <SelectList label={surveyComponent.name} values={valuesToMap(surveyComponent.values)} text={answer} handleSelection={save} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 3) && <Checkbox name={surveyComponent.name} text={""} onValueChange={() => onCheckBoxChange()} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 4) && <InputDate name={surveyComponent.name} text={answer} onTextChange={save} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 5) && surveyComponent.values && <RadioButtons label={surveyComponent.name} values={valuesToMap(surveyComponent.values)} text={""} onTextChange={""} inline={true} />}
						{(surveyComponent.type === 0) && (surveyComponent.questionType == 6) && <InputFile name={surveyComponent.name} text={answer} onTextChange={save} inline={true} />}
						{(surveyComponent.type === 1) && <div className={surveyComponent.style}>{surveyComponent.name}</div>}
						
					</div>
				</div>
			</div>

		</div>);
}

export default SurveyComponentFillable;