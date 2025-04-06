import React, { useState, useContext } from "react";
import '../css/login.css';
import axios from 'axios';
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
	//const [userState,setUserState] = useUserContext();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [alerts, setAlerts] = useState([]);
	const navigate = useNavigate();
	const [username, setUsername] = useState('ad00');
	const [password, setPassword] = useState('administrator');

	const submitLogin = () => {
		// Prevent the browser from reloading the page
		//read the form
		if (isEmpty(username))
			setAlerts([{ message: "Username is mandatory", type: "error" }])
		else
			if (isEmpty(password))
				setAlerts([{ message: "Password is mandatory", type: "error" }])
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
					setAlerts([{ message: "Response invalid from the server", type: "error" }]);
				}
			})
			.catch((error) => {
				setAlerts([{ message: "An error occured" + error, type: "error" }]);
			});

	}
	return (
		<div className="login-wrapper">
			<h1>Connection</h1>
			<AlertsPanel alerts={alerts}></AlertsPanel>
			<div className='mb-3'>
				<label htmlFor='userName' className='form-label'>Login</label>
				<input type='text' className='form-control' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
			</div>
			<div className='mb-3'>
				<label htmlFor='password' className='form-label'>Password</label>
				<input type='password' className='form-control' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
			</div>
			<ActionButton name={"signin"} text={"Sign in"} onClick={submitLogin} />
		</div>
	)
}