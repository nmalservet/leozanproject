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

	const [id, setId] = useState(initialSurvey?initialSurvey.id:null);
	const [name, setName] = useState(initialSurvey?initialSurvey.name:'');
	const [status, setStatus] = useState(initialSurvey?initialSurvey.status:'');
const [author, setAuthor] = useState(initialSurvey?initialSurvey.author:'');
	const [project, setProject] = useState(initialSurvey?initialSurvey.project:'');
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);
	const [description, setDescription] = useState(initialSurvey?initialSurvey.description:'');
	const [responsible, setResponsible] = useState(initialSurvey?initialSurvey.responsible:'');

	/**
	 * call back if alert to be hidden.
	 */
	function closeAlert() {
		setHiddenAlert(true);
	}

	function save() {
		setHiddenAlert(false);
		setAlerts([]);
		//checks
		var errorsForm = 0;
		//
		let survey = {};
		if(id)
			survey.id=id;
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
			setAlerts([{ message: "Le nom est obligatoire", type: "error" }]);
			errorsForm++;
		}
		if (!survey.project || survey.project.length === 0) {
			setAlerts([{ message: "Le projet est obligatoire", type: "error" }]);
			errorsForm++;
		}
		if (errorsForm === 0) {
			if (!survey.id) {
				Api.addSurvey(survey).then(response => {
					if (response) {
						setId(response.data);
						setAlerts([{ message: "Le questionnaire a été créé", type: "success" }]);
					}
				})
			} else {
				Api.updateSurvey(survey).then(response => {
					if (response)
						setAlerts([{ message: "Le questionnaire a été enregistré", type: "success" }]);
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
				<h1>Questionnaire #{id}</h1>
				{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
				<form >
					<div className="grid grid-col-1 gap-1 m-2">
						<div className="" >
							{author && <label className="">created by <i>{author}</i></label>}
						</div>
						<InputText name={"Nom"} text={name} onTextChange={setName} />
						<QuillTextArea name={"Description"} text={description} onTextChange={setDescription} readOnly={readOnly} />
						<div className="grid grid-col-2 gap-1 m-1">
							<UsersSelectList label={"Responsable"} selected={responsible} onSelection={setResponsible} readOnly={readOnly} />
							<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
							<ProjectsSelectList selected={project} onSelection={setProject} readOnly={readOnly} />
						</div>
					</div>
				</form>
				<hr />
				<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
					{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Annuler</button>}
					{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Enregistrer</button>}
				</div>

		</div>);
}

export default Survey;