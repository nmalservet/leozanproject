import { useState, useContext } from "react";
import Api from '../../Api.js';
import AlertsPanel from '../common/AlertsPanel';
import InputText from '../common/InputText.js';
import InputDate from '../common/InputDate.js';
import ProjectsSelectList from './ProjectsSelectList.js';
import PrioritiesSelectList from './PrioritiesSelectList.js';
import StatusSelectList from './StatusSelectList.js';
import UsersSelectList from './UsersSelectList.js';
import QuillTextArea from '../common/QuillTextArea.js';
import { CurrentUserContext } from '../../context/user-context.js';
import {isEmpty} from '../../utils/StringUtils.js'



/**
 * task component, to create or edit a tasks
 */
function Patient({ initialPatient, readOnly }) {

	const { currentUser } = useContext(CurrentUserContext);
	const [task] = useState(initialPatient);
	const [estimatedTime, setEstimatedTime] = useState(1);
	const [projectId, setProjectId] = useState(initialPatient.name);
	const [topic, setTopic] = useState(initialPatient.name);
	const [status, setStatus] = useState(initialPatient.status);
	const [priority, setPriority] = useState(initialPatient.priority);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [progress, setProgress] = useState(null);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);
	const [description, setDescription] = useState(initialPatient.description);
	const [responsible, setResponsible] = useState(initialPatient.responsibleId);
	const debug = false;

	/**
	 * call back if alert to be hidden.
	 */
	function closeAlert() {
		setHiddenAlert(true);
	}

	function save() {
		setHiddenAlert(false);
		//always inside the current project
		if (initialPatient.projectId !== undefined && initialPatient.projectId != null)
			task.projectId = initialPatient.projectId
		else {
			task.projectId = (currentUser.projectId) ? currentUser.projectId : projectId;
		}
		task.estimatedTime = estimatedTime;
		task.name = (topic) ? topic : task.name;
		if (startDate)
			task.startDate = startDate;
		if (endDate)
			task.endDate = endDate;
		if (progress)
			task.progress = progress;
		if (priority)
			task.priority = priority;
		if (status)
			task.status = status;
		if (description)
			task.description = description;
		if (responsible)
			task.responsibleId = responsible;
		var errorsForm = 0;
		if (!task.projectId) {
			setAlerts([{ message: "The project is undefined", type: "error" }]);
			errorsForm++;
		}

		if (task.name === undefined || task.name.length === 0) {
			setAlerts([{ message: "The topic of the task is undefined", type: "error" }]);
			errorsForm++;
		}
		if (errorsForm === 0) {
			if (!task.id) {
				Api.addPatient(task).then(response => {
					if (response) {
						task.id = response.data;
						setAlerts([{ message: "The task has been created", type: "success" }]);
					}
				})
			} else {
				Api.updatePatient(task).then(response => {
					if (response)
						setAlerts([{ message: "The task has been saved", type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to tasks?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="max-w-2xl ">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<div className="" >
						{task.id && <label># <span style={{ marginLeft: '10px' }}>{task.id}</span></label>}
						{task.author && <label className="">created by <i>{task.author}</i></label>}
					</div>
					<InputText name={"Topic"} text={topic} onTextChange={setTopic}></InputText>
					{isEmpty(currentUser.projectId) && <ProjectsSelectList onSelection={setProjectId} />}
					<UsersSelectList label={"Responsible"} selected={responsible} onSelection={setResponsible} readOnly={readOnly} />
					<QuillTextArea name={"Description"} text={description} onTextChange={setDescription} readOnly={readOnly} />
					<div className=""><h3>Planning</h3><hr /></div>
					<div className="grid grid-cols-2 content-start gap-1">
						<PrioritiesSelectList selected={priority} onSelection={setPriority} readOnly={readOnly} />
						<StatusSelectList selected={task.status} onSelection={setStatus} readOnly={readOnly} />
						<InputText name={"Estimated Time (h)"} text={task.estimatedTime} readOnly={readOnly} onTextChange={setEstimatedTime} />
						<InputText name={"Progress (%)"} text={task.progress} readOnly={readOnly} onTextChange={setProgress}></InputText>
						<InputDate name={"Start Date"} text={task.startDate} readOnly={readOnly} onTextChange={setStartDate}></InputDate>
						<InputDate name={"End Date"} text={task.endDate} readOnly={readOnly} onTextChange={setEndDate}></InputDate>
					</div>
					{debug === true && <div className=""><label className="">Version : </label></div>}
					{debug === true && <div className="row"><div className="" ><h3>Relations</h3><hr /></div></div>}
					{debug === true && <div className="row">
						<div className=""><label className="">Parent : </label></div>
					</div>}

					{debug === true && <div className=""><div className=""><h3>Tâches précédentes</h3></div></div>}
					{debug === true && <div className="">
						<div className="" >
							<div className="">
								<div className=""><label className="">Ajouter une tâche précédente : </label></div>
							</div>
						</div>
					</div>}
				</div>
			</form>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
			</div>
		</div>);
}

export default Patient;