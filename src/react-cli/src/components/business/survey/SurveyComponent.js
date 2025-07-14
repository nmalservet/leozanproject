import { useState } from "react";
import Api from '../../../Api.js';
import AlertsPanel from '../../common/AlertsPanel';
import InputText from '../../common/InputText.js';
import StatusSelectList from '../StatusSelectList.js';
import QuestionTypeSelectList from '../QuestionTypeSelectList.js';

import SurveyObjectTypeSelectList from './SurveyObjectTypeSelectList.js';

/**
 * survey component, to create or edit a surveys
 * onSave : action to process on save
 * onCancel action to process on cancel
 */
function SurveyComponent({ surveyComponent, surveyId, readOnly, onSave, onCancel }) {

	const [sc, setSc] = useState(surveyComponent);
	const [name, setName] = useState(surveyComponent.name ? surveyComponent.name : '');
	const [style, setStyle] = useState(surveyComponent.style);
	const [position, setPosition] = useState(surveyComponent.position);

	const [type, setType] = useState(surveyComponent.type);
	const [status, setStatus] = useState(surveyComponent.status);
	
	//if the object is a type question
	const [questionType, setQuestionType] = useState(surveyComponent.questionType);
	//if the object is a type question and a question type select list or radio buttons
	const [values, setValues] = useState(surveyComponent.values);

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
		if (surveyId != null)
			sc.surveyId = surveyId;
		sc.type = (type) ? type : 0;
		sc.name = (name) ? name : '';
		sc.style = (style) ? style : '';
		sc.position = (position) ? position : '';
		sc.status = (status) ? status : 0;
		if(type==0)
			sc.questionType = questionType;
		if(type==0&&(questionType==2||questionType==5 ))
			if(values)
			sc.values=values;
			else{
				errorsForm++;
				setAlerts([{ message: "Values are need for select list or radio buttons", type: "error" }]);
			}
			
		if (!sc.name || sc.name.length === 0) {
			setAlerts([{ message: "The name is undefined", type: "error" }]);
			errorsForm++;
		}
		if (errorsForm === 0) {
			if (!sc.id) {
				Api.addSurveyComponent(sc).then(response => {
					if (response) {
						var s2 = sc;
						s2.id = response.data;
						setSc(s2);
						setAlerts([{ message: "The survey object has been created", type: "success" }]);
						onSave();
					}
				})
			} else {
				Api.updateSurveyObject(surveyComponent).then(response => {
					if (response)
						setAlerts([{ message: "The survey object has been saved", type: "success" }]);
						onSave();
				})
			}
		}
		
	}

	//if cancel, go back to surveys?
	function cancel() {
		console.log("cancel, what to do?");
		onCancel();
	}


	return (
		<div className="border-2 border-dashed rounded-lg">
			<h1>Survey Component #{surveyComponent.id}</h1>
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">

					<SurveyObjectTypeSelectList selected={type} onSelection={setType} readOnly={readOnly} />
					<p className="italic">Component Type question will display a question. Component type Text will insert basic text, usefull for comments or descriptions. </p>

					{type==0&&<div><QuestionTypeSelectList selected={questionType} onSelection={setQuestionType} readOnly={readOnly} />
					<p className="italic">Type of the question, to display the appropriate input related to the question. </p></div>}

					{type==0&&(questionType==2||questionType==5)&&<div><InputText name={"values"} text={values} onTextChange={setValues} inline={true}  />
					<p className="italic">Values proposed into the list, use semi-column (;) as separator. Example : cat; dog; mouse </p></div>}

					<InputText name={"Label"} text={name} onTextChange={setName} inline={true} />
					<p className="italic">Label of the component.If the component type is a question, the label will be displayed.  </p>

					
					<InputText name={"Style"} text={style} onTextChange={setStyle} inline={true} />
					<p className="italic">Style is applied during the rendering. You can use basic CSS and Tailwind classes to improve the rendering on specific components.</p>
					<InputText name={"Position"} text={position} onTextChange={setPosition} inline={true} />
					<p className="italic"> Position is the display rank into the list of component. Integer value only.</p>
					<div className="grid grid-col-2 gap-1 m-1">
						<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />

					</div>
				</div>
			</form>
			<div>

			</div>
			<hr />
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
			</div>
		</div>);
}

export default SurveyComponent;