import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Api from '../../Api.js';
import AlertsPanel from '../common/AlertsPanel';
import InputText from '../common/InputText.js';
import Checkbox from '../common/Checkbox.js';
import StatusSelectList from './StatusSelectList.js';
import QuillTextArea from '../common/QuillTextArea.js';
/**
 * Version component, to create or edit a Versions
 * projectId is fixed.
 */
function Version({ projectId,initialVersion, readOnly }) {
	const { t } = useTranslation();
	const [version] = useState(initialVersion);
	const [disabled, setDisabled] = useState(false);
	const [name, setName] = useState(initialVersion.name);
	const [status, setStatus] = useState(initialVersion.status);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);
	const [description, setDescription] = useState(initialVersion.description);

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
		console.log("VersionId"+version.id);
		//
		version.projectId=projectId;
		if (name)
			version.name = name;
		
		if (status)
			version.status = status;
		if (description)
			version.description = description;
		version.disabled = disabled;
		if (!version.name|| version.name.length === 0) {
					setAlerts([{ message: t("version.nameRequired"), type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!version.id) {
				Api.addVersion(version).then(response => {
					if (response) {
						version.id = response.data;
						setAlerts([{ message: t("version.created"), type: "success" }]);
					}
				})
			} else {
				Api.updateVersion(version).then(response => {
					if (response)
						setAlerts([{ message: t("version.saved"), type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to Versions?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="max-w-2xl">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<InputText name={t("common.name")} text={name} onTextChange={setName}/>
					<QuillTextArea name={t("common.description")} text={description} onTextChange={setDescription} readOnly={readOnly} />
					<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
					<Checkbox name={t("common.disabled")} value={disabled} onValueChange={setDisabled}/>
				</div>
			</form>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>{t("common.cancel")}</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>{t("common.save")}</button>}
			</div>
		</div>);
}

export default Version;