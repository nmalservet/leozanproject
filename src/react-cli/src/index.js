import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import axios from 'axios';

/**
 * set axios interceptor to manage exception
 */
axios.interceptors.response.use((response) => {
	return response;
}, (error) => { // Anything except 2XX goes to here
	const status = error.response?.status || 500;
	if (status === 300) {//case th erequest must be modified ( bad request, unexpected parameters etc)
		throw new Error(error.response.data.message);
	} else
		if (status === 301) {//case th erequest must be modified ( bad request, unexpected parameters etc)
			throw new Error(error.response.data.message);
		} else
			if (status === 302) {//case we want to redirect to login, for unauthorized or unexpected browsing
				window.location = window.location.protocol + "//" + window.location.host + "/login"
			} else
				if (status === 303) {//See other : Call the admin
					throw new Error(error.response.data.message);
				} else
					if (status === 401) { // should not occurs, redirected on 302.
						window.location = window.location.protocol + "//" + window.location.host + "/login"
					} else
						if (status === 403) { // no more permissions, do a relog
							window.location = window.location.protocol + "//" + window.location.host + "/login"
						} else
							if (status === 405) { // method not allowed
								window.location = window.location.protocol + "//" + window.location.host + "/login"
							} else {
								return Promise.reject(error); // Delegate error to calling side
							}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);