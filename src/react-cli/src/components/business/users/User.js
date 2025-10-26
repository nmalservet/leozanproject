import { useState} from "react";
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
			setAlerts([{ message: "The name is mandatory", type: "error" }]);
			errorsForm++;
		}
		if (user.firstName === undefined || user.firstName.length === 0) {
			setAlerts([{ message: "The firstName is mandatory", type: "error" }]);
			errorsForm++;
		}
		if (user.username === undefined || user.username.length === 0) {
			setAlerts([{ message: "The username is mandatory", type: "error" }]);
			errorsForm++;
		}
		if (!user.id&&(user.password === undefined || user.password.length === 0)) {
					setAlerts([{ message: "The password is mandatory", type: "error" }]);
					errorsForm++;
				}
		if (user.email === undefined || user.email.length === 0) {
					setAlerts([{ message: "The email is mandatory", type: "error" }]);
					errorsForm++;
				}
		if (errorsForm === 0) {
			if (!user.id) {
				Api.addUser(user).then(response => {
					if (response) {
						user.id = response.data;
						setAlerts([{ message: "L'utilisateur a été créé", type: "success" }]);
					}
				})
			} else {
				Api.updateUser(user).then(response => {
					if (response)
						setAlerts([{ message: "L'tulisateur a été enregistré", type: "success" }]);
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
					<InputText name={"Nom"} text={user.name} onTextChange={setName}></InputText>
					<InputText name={"Prénom"} text={user.firstName} onTextChange={setFirstName}></InputText>
					<InputText name={"Utilisateur"} text={user.username} onTextChange={setUsername}></InputText>
					<InputText name={"Email"} text={user.email} onTextChange={setEmail}></InputText>
					<InputPasswordText name={"Mot de passe"} type='password' text={password} onTextChange={setPassword}/>
					<RoleSelectList selected={user.role} onSelection={setRole} readOnly={readOnly} />
					<Checkbox name={"Inactif"} value={user.disabled} onValueChange={setDisabled}/>
				</div>
			</form>
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>Annuler</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>Enregistrer</button>}
			</div>
		</div>);
}

export default User;