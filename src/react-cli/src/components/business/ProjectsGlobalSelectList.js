import React, { useState, useEffect, useContext } from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';
import { CurrentUserContext } from '../../context/user-context.js';
import { ProjectsContext } from '../../context/projects-context.js';

/**
 * select list for the projects used globally. used to set the project context global
 * 
 */

export default function ProjectsGlobalSelectList() {

	const [localProjects, setLocalProjects] = useState([]);
	const {currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const  {projects}  = useContext(ProjectsContext);

	/**
	 * on selection set the context
	 */
	function onSelection(id) {
		var user = {...currentUser};
		user.projectId = id;
		//user.countProjects=1;
		setCurrentUser(user);
	}

	function loadData() {
		console.log("refreshed");
		Api.getProjectsEnabled().then((response) => {
			if (response !== undefined) {
				var pMap = new Map();
				pMap.set("","All projects");//we add the all projets items
				response.data.forEach((project) => {
					pMap.set(project.id, project.name)
				})
				setLocalProjects(pMap);
			}
		})
		.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { loadData({}); }, [projects]);

	return (
		<div>
			<SelectList label={""} values={localProjects} selected={""} handleSelection={onSelection} withFirstItem={false} emptyAllowed={true} />
		</div>
	);
}