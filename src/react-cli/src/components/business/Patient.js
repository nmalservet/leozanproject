import { useState } from "react";
import Api from '../../Api.js';
import AlertsPanel from '../common/AlertsPanel';
import InputText from '../common/InputText.js';
//import {isEmpty} from '../../utils/StringUtils.js'

/**
 * patientcomponent, to create or edit a tasks
 */
function Patient({ initialPatient, readOnly }) {

	const [name, setName] = useState(null);
	const [patient, setPatient] = useState(initialPatient);
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

		patient.name = (name) ? name : '';

		var errorsForm = 0;
		if (!patient.name.name === undefined || patient.name.length === 0) {
			setAlerts([{ message: "The name is undefined", type: "error" }]);
			errorsForm++;
		}

		if (errorsForm === 0) {
			if (!patient.id) {
				Api.addPatient(patient).then(response => {
					if (response) {
						patient.id = response.data;
						setAlerts([{ message: "The patient has been created", type: "success" }]);
					}
				})
			} else {
				Api.updatePatient(patient).then(response => {
					if (response)
						setAlerts([{ message: "The patient has been saved", type: "success" }]);
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
						{patient&&patient.id && <label># <span style={{ marginLeft: '10px' }}>{patient.id}</span></label>}
					</div>
					<InputText name={"Name"} text={patient.name} onTextChange={setName} />


				</div>
			</form>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Cancel</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Save</button>}
			</div>
		</div>);
}

export default Patient;