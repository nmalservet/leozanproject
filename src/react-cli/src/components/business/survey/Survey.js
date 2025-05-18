import { useState } from "react";
import Api from '../../../Api.js';
import AlertsPanel from '../../common/AlertsPanel';
import InputText from '../../common/InputText.js';
import StatusSelectList from '../StatusSelectList.js';

import ProjectsSelectList from '../ProjectsSelectList.js';
import UsersSelectList from '../UsersSelectList.js';
import QuillTextArea from '../../common/QuillTextArea.js';

/**
 * survey component, to create or edit a surveys
 */
function Survey({ initialSurvey, readOnly }) {

	const [survey, setSurvey] = useState(initialSurvey);
	const [name, setName] = useState(initialSurvey.name);
	const [status, setStatus] = useState(initialSurvey.status);

	const [project, setProject] = useState(initialSurvey.project);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);
	const [description, setDescription] = useState(initialSurvey.description);
	const [responsible, setResponsible] = useState(initialSurvey.responsible);

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
			survey.name = name;
		if (status)
			survey.status = status;
		if (description)
			survey.description = description;
		if (responsible)
			survey.responsible = responsible;
		if (project)
			survey.project = project;
		if (!survey.name || survey.name.length === 0) {
			setAlerts([{ message: "The name is undefined", type: "error" }]);
			errorsForm++;
		}
		if (!survey.project || survey.project.length === 0) {
			setAlerts([{ message: "The project is undefined", type: "error" }]);
			errorsForm++;
		}
		if (errorsForm === 0) {
			if (!survey.id) {
				Api.addSurvey(survey).then(response => {
					if (response) {
						var s2 = survey;
						s2.id = response.data;
						setSurvey(s2);
						setAlerts([{ message: "The survey has been created", type: "success" }]);
					}
				})
			} else {
				Api.updateSurvey(survey).then(response => {
					if (response)
						setAlerts([{ message: "The survey has been saved", type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to surveys?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="max-w-2xl">
				<h1>Survey #{survey.id}</h1>
				{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
				<form >
					<div className="grid grid-col-1 gap-1 m-2">
						<div className="" >
							{survey.author && <label className="">created by <i>{survey.author}</i></label>}
						</div>
						<InputText name={"Name"} text={name} onTextChange={setName} />
						<QuillTextArea name={"Description"} text={description} onTextChange={setDescription} readOnly={readOnly} />
						<div className="grid grid-col-2 gap-1 m-1">
							<UsersSelectList label={"Responsible"} selected={responsible} onSelection={setResponsible} readOnly={readOnly} />
							<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
							<ProjectsSelectList selected={project} onSelection={setProject} readOnly={readOnly} />
						</div>
					</div>
				</form>
				<hr />
				<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
					{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
					{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
				</div>

		</div>);
}

export default Survey;