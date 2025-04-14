import { useState } from "react";
import Api from '../../Api.js';
import AlertsPanel from '../common/AlertsPanel';
import InputText from '../common/InputText.js';
import StatusSelectList from './StatusSelectList.js';

import SurveyObjectTypeSelectList from './SurveyObjectTypeSelectList.js';

/**
 * survey component, to create or edit a surveys
 */
function SurveyObject({ initialSurveyObject, readOnly }) {

	const [surveyObject,setSurveyObject] = useState(initialSurveyObject);
	const [name, setName] = useState(initialSurveyObject.name?initialSurveyObject.name:'');
	const [style, setStyle] = useState(initialSurveyObject.style);
	const [position, setPosition] = useState(initialSurveyObject.position);
	
	const [type, setType] = useState(initialSurveyObject.type);
	const [status, setStatus] = useState(initialSurveyObject.status);
	
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);

	/**
	 * call back if alert to be hidden.
	 */
	function closeAlert() {
		setHiddenAlert(true);
	}

	function save() {
		setHiddenAlert(false);
		//checks
		var errorsForm = 0;
		//
		if (name)
			surveyObject.name = name;
		if (style)
			surveyObject.style = style;
		if (position)
			surveyObject.position = position;
		if (status)
			surveyObject.status = status;
		if (!surveyObject.name|| surveyObject.name.length === 0) {
					setAlerts([{ message: "The name is undefined", type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!surveyObject.id) {
				Api.addSurveyObject(surveyObject).then(response => {
					if (response) {
						var s2 = surveyObject;
						s2.id = response.data;
						setSurveyObject(s2);
						setAlerts([{ message: "The survey object has been created", type: "success" }]);
					}
				})
			} else {
				Api.updateSurvey(surveyObject).then(response => {
					if (response)
						setAlerts([{ message: "The survey object has been saved", type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to surveys?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="border-2 border-dashed rounded-lg">
		<h1>Survey Object #{surveyObject.id}</h1>
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<InputText name={"Name"} text={name} onTextChange={setName}/>
					<InputText name={"Style"} text={style} onTextChange={setStyle}/>
					
					<InputText name={"Position"} text={position} onTextChange={setPosition}/>
					<div className="grid grid-col-2 gap-1 m-1">
						<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
						
						<SurveyObjectTypeSelectList selected={type} onSelection={setType} readOnly={readOnly} />
					</div>
				</div>
			</form>
			<div>
			
			</div>
			<hr/>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
			</div>
		</div>);
}

export default SurveyObject;