import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LoginView from './views/LoginView'

import React, { useState } from 'react';
import { CurrentUserContext } from './context/user-context.js';
import Layout from './components/layout/Layout';
import DashboardView from './views/DashboardView';
import SurveysView from './views/SurveysView';
import PatientsView from './views/PatientsView';

import AddPatientView from './views/AddPatientView';
import AddSurveyView from './views/AddSurveyView';
import EditPatientView from './views/EditPatientView';
import ViewPatientView from './views/ViewPatientView';
import AdministrationView from './views/AdministrationView';
import ProjectsView from './views/ProjectsView';
import UsersView from './views/UsersView';
import ProtectedRoutes from './ProtectedRoutes';
import NotFoundView from './NotFoundView';
import LogoutView from './views/LogoutView';

function App() {

	const [currentUser, setCurrentUser] = useState(null);
	const router = createBrowserRouter(
		[{
			path: '/',
			element: <Layout />,
			children: [
				{ path: 'login', element: <LoginView /> },
				{ path: 'logout', element: <LogoutView /> },
				{ path: 'dashboard', element: <DashboardView /> },

				{ path: 'surveys', element: <SurveysView/> },
				{ path: 'patients', element: <PatientsView/> },
				{ path: 'addPatient', element: <AddPatientView /> },
				{ path: 'addSurvey', element: <AddSurveyView /> },
				{ path: 'editPatient/:patientId', element: <EditPatientView /> },
				{ path: 'viewPatient/:patientId', element: <ViewPatientView /> },
				{ path: 'projects', element: <ProjectsView /> },
				{ path: 'users', element: <UsersView /> },
				{
					//role='manager||administrator'
					element: <ProtectedRoutes />,
					children: [
						{ path: 'administration', element: <AdministrationView /> },
					]
				}
			]
		},
		{
			path: '*', element: <NotFoundView />,
		}]
	)
	return (
		<CurrentUserContext.Provider value={{currentUser,setCurrentUser}}>
			<RouterProvider router={router}></RouterProvider>
		</CurrentUserContext.Provider>
	)
}
export default App;