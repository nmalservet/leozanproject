import { useState } from "react";
import Api from '../../Api.js';
import AlertsPanel from '../common/AlertsPanel';
import InputText from '../common/InputText.js';
import Checkbox from '../common/Checkbox.js';
import StatusSelectList from './StatusSelectList.js';
import UsersSelectList from './UsersSelectList.js';
import QuillTextArea from '../common/QuillTextArea.js';
/**
 * project component, to create or edit a projects
 */
function Project({ initialProject, readOnly }) {

	const [project] = useState(initialProject);
	const [disabled, setDisabled] = useState(false);
	const [name, setName] = useState(initialProject.name);
	const [status, setStatus] = useState(initialProject.status);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);
	const [description, setDescription] = useState(initialProject.description);
	const [responsible, setResponsible] = useState(initialProject.responsible);

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
		console.log("projectId"+project.id);
		//
		if (name)
			project.name = name;
		if (status)
			project.status = status;
		if (description)
			project.description = description;
		if (responsible)
			project.responsible = responsible;
		project.disabled = disabled;
		if (!project.name|| project.name.length === 0) {
					setAlerts([{ message: "The name is undefined", type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!project.id) {
				Api.addProject(project).then(response => {
					if (response) {
						project.id = response.data;
						setAlerts([{ message: "The project has been created", type: "success" }]);
					}
				})
			} else {
				Api.updateProject(project).then(response => {
					if (response)
						setAlerts([{ message: "The project has been saved", type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to projects?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="max-w-2xl">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<div className="" >
						{project.author && <label className="">created by <i>{project.author}</i></label>}
					</div>
					<InputText name={"Name"} text={name} onTextChange={setName}/>
					<UsersSelectList label={"Responsible"} selected={responsible} onSelection={setResponsible} readOnly={readOnly} />
					<QuillTextArea name={"Description"} text={description} onTextChange={setDescription} readOnly={readOnly} />
					<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
					<Checkbox name={"Disabled"} value={disabled} onValueChange={setDisabled}/>
				</div>
			</form>
			<hr/>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
			</div>
		</div>);
}

export default Project;