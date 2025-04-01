import { useState, useMemo, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { NotificationContext } from '../../context/notification-context';
import NotificationPanel from "../common/NotificationPanel";
import LeftMenuPanel from "./LeftMenuPanel";
import {CurrentUserContext} from '../../context/user-context.js';
import {ProjectsContext} from '../../context/projects-context.js';

function Layout() {
	const {currentUser} = useContext(CurrentUserContext);
	const [notifications, setNotifications] = useState(null);
	//const [projects, setProjects] = useState(null);
	const value = useMemo(
		() => ({ notifications, setNotifications }),
		[notifications]
	);
	const [projects, setProjects] = useState(); 
	//const projects = useContext(ProjectsContext);

	/**
	 * We provide the message context to the page to pass notification mesages.
	 */
	return (
		<div className="max-w-full min-h-screen bg-gradient-to-br from-secondary-100 to-primary-100 animate-gradient">
			<NotificationContext.Provider value={value}>
			<ProjectsContext.Provider value={{projects,setProjects}}>
				<Navbar />
				<div className="flex flex-1" >
					<div>
						{currentUser!==null && <div className="flex flex-1"><LeftMenuPanel></LeftMenuPanel> </div>}
					</div>
					<div className="flex-1 p-2">
						<div className=""><NotificationPanel></NotificationPanel></div>
						<div className="bg-white rounded-lg border border-gray-300"><Outlet /></div>
					</div>
				</div>
				</ProjectsContext.Provider>
			</NotificationContext.Provider>
		</div>
	)
}
export default Layout;