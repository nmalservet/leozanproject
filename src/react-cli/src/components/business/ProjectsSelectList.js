import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';

/**
 * select list for the projects. Reusable component
 */

export default function ProjectsSelectList({selected, onSelection }) {

	const [projects, setProjects] = useState([]);

	function loadData() {
		Api.getProjectsEnabled().then((response) => {
			if (response !== undefined) {
				var pMap = new Map();
				response.data.forEach((project) => {
					pMap.set(project.id, project.name)
				})
				setProjects(pMap);
			}
		})
			.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { loadData({}); }, []);

	return (
		<>
			<SelectList label={"Projet"} values={projects} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}