import { useState} from "react";
import { useTranslation } from 'react-i18next';
import Api from '../../../Api.js';
import AlertsPanel from '../../common/AlertsPanel';
import InputText from '../../common/InputText.js';
import InputPasswordText from '../../common/InputPasswordText.js';
import RoleSelectList from '../RoleSelectList.js';
import Checkbox from '../../common/Checkbox.js';
/**
 * user component, to create or edit a users
 */
function User({ initialUser, readOnly }) {
	const { t } = useTranslation();
	const [user] = useState(initialUser);
	const [disabled, setDisabled] = useState(0);
	const [name, setName] = useState(null);
	const [password, setPassword] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [role, setRole] = useState(null);
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
		if (name)
			user.name = name;
		if (firstName)
			user.firstName = firstName;
		if (username)
			user.username = username;
		if (email)
			user.email = email;
		if (password)
			user.password = password;
		if (role)
			user.role = role;
		user.disabled= disabled;

		var errorsForm = 0;
		if (user.name === undefined || user.name.length === 0) {
			setAlerts([{ message: t("user.nameRequired"), type: "error" }]);
			errorsForm++;
		}
		if (user.firstName === undefined || user.firstName.length === 0) {
			setAlerts([{ message: t("user.firstNameRequired"), type: "error" }]);
			errorsForm++;
		}
		if (user.username === undefined || user.username.length === 0) {
			setAlerts([{ message: t("user.usernameRequired"), type: "error" }]);
			errorsForm++;
		}
		if (!user.id&&(user.password === undefined || user.password.length === 0)) {
					setAlerts([{ message: t("user.passwordRequired"), type: "error" }]);
					errorsForm++;
				}
		if (user.email === undefined || user.email.length === 0) {
					setAlerts([{ message: t("user.emailRequired"), type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!user.id) {
				Api.addUser(user).then(response => {
					if (response) {
						user.id = response.data;
						setAlerts([{ message: t("user.created"), type: "success" }]);
					}
				})
			} else {
				Api.updateUser(user).then(response => {
					if (response)
						setAlerts([{ message: t("user.saved"), type: "success" }]);
				})
			}
		}
	}

	//if cancel, go back to users?
	function cancel() {
		console.log("cancel, what to do?");
	}


	return (
		<div className="max-w-2xl">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
					<div className="" >
						{user.id && <label># <span style={{ marginLeft: '10px' }}>{user.id}</span></label>}
					</div>
					<InputText name={t("common.name")} text={user.name} onTextChange={setName}></InputText>
					<InputText name={t("patient.firstName")} text={user.firstName} onTextChange={setFirstName}></InputText>
					<InputText name={t("user.username")} text={user.username} onTextChange={setUsername}></InputText>
					<InputText name={t("user.email")} text={user.email} onTextChange={setEmail}></InputText>
					<InputPasswordText name={t("user.password")} type='password' text={password} onTextChange={setPassword}/>
					<RoleSelectList selected={user.role} onSelection={setRole} readOnly={readOnly} />
					<Checkbox name={t("common.disabled")} value={user.disabled} onValueChange={setDisabled}/>
				</div>
			</form>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-bold py-1 px-3 rounded ml-10" onClick={() => cancel()}>{t("common.cancel")}</button>}
				{readOnly !== true && <button className="border border-primary-700 text-primary-700 hover:bg-primary-50 font-bold py-1 px-3 rounded" onClick={() => save()}>{t("common.save")}</button>}
			</div>
		</div>);
}

export default User;