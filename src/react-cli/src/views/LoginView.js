import React, { useState, useContext } from "react";
import '../css/login.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Api from '../Api.js';
import AlertsPanel from '../components/common/AlertsPanel';
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../context/user-context.js';
import ActionButton from '../components/common/ActionButton.js';
import { isEmpty } from '../utils/StringUtils.js'

/**
 * setCurrentUser callback function to parent
 */
export default function LoginView() {
	const { t } = useTranslation();
	//const [userState,setUserState] = useUserContext();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [alerts, setAlerts] = useState([]);
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submitLogin = () => {
		// Prevent the browser from reloading the page
		//read the form
		if (isEmpty(username))
			setAlerts([{ message: t("login.usernameRequired"), type: "error" }])
		else
			if (isEmpty(password))
				setAlerts([{ message: t("login.passwordRequired"), type: "error" }])
			else {
				const data = { username: username, password: password }
				loginAction(data);
			}
	}

	function loginAction(request) {
		//we post the login to retrieve the token
		Api.login(request)
			.then((response) => {
				if (response !== undefined) {
					axios.defaults.headers.common['Authorization'] = response.headers['token'];
					var user = {};
					user.username = request.username;
					user.token = response.headers['token'];
					if (currentUser !== user)
						setCurrentUser(user);

					//console.log("go to tasks");
					navigate('/surveys');
				} else {
					setAlerts([{ message: t("login.invalidResponse"), type: "error" }]);
				}
			})
			.catch((error) => {
				setAlerts([{ message: t("login.error") + error, type: "error" }]);
			});

	}
	return (
		<div className="login-wrapper">
			<h1>{t("login.title")}</h1>
			<AlertsPanel alerts={alerts}></AlertsPanel>
			<div className='mb-3'>
				<label htmlFor='userName' className='mb-2 inline-block'>{t("login.username")}</label>
				<input type='text' className='block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
			</div>
			<div className='mb-3'>
				<label htmlFor='password' className='mb-2 inline-block'>{t("login.password")}</label>
				<input type='password' className='block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
			</div>
			<ActionButton name={"signin"} text={t("login.signIn")} onClick={submitLogin} />
		</div>
	)
}