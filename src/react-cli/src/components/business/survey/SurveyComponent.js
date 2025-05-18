import { useState } from "react";
import Api from '../../../Api.js';
import AlertsPanel from '../../common/AlertsPanel';
import InputText from '../../common/InputText.js';
import StatusSelectList from '../StatusSelectList.js';

import SurveyObjectTypeSelectList from './SurveyObjectTypeSelectList.js';

/**
 * survey component, to create or edit a surveys
 */
function SurveyComponent({ initialSurveyComponent,surveyId, readOnly }) {

	const [surveyComponent,setSurveyObject] = useState(initialSurveyComponent);
	const [name, setName] = useState(initialSurveyComponent.name?initialSurveyComponent.name:'');
	const [style, setStyle] = useState(initialSurveyComponent.style);
	const [position, setPosition] = useState(initialSurveyComponent.position);
	
	const [type, setType] = useState(initialSurveyComponent.type);
	const [status, setStatus] = useState(initialSurveyComponent.status);
	
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
		surveyComponent.surveyId=surveyId;
		if (name)
			surveyComponent.name = name;
		if (style)
			surveyComponent.style = style;
		if (position)
			surveyComponent.position = position;
		if (status)
			surveyComponent.status = status;
		if (!surveyComponent.name|| surveyComponent.name.length === 0) {
					setAlerts([{ message: "The name is undefined", type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!surveyComponent.id) {
				Api.addSurveyObject(surveyComponent).then(response => {
					if (response) {
						var s2 = surveyComponent;
						s2.id = response.data;
						setSurveyObject(s2);
						setAlerts([{ message: "The survey object has been created", type: "success" }]);
					}
				})
			} else {
				Api.updateSurvey(surveyComponent).then(response => {
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
		<h1>Survey Component #{surveyComponent.id}</h1>
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<InputText name={"Name"} text={name} onTextChange={setName}/>
					<InputText name={"Style"} text={style} onTextChange={setStyle}/>
					
					<InputText name={"Position"} text={position} onTextChange={setPosition}/>
					<p class="italic"> Position is the display rank into the list of component. Integer value only.</p>
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

export default SurveyComponent;