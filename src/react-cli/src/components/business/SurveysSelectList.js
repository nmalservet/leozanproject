import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';

/**
 * select list for the projects. Reusable component
 * @param projectId toi filter by project.
 */

export default function SurveysSelectList({projectId,selected, onSelection }) {

	const [surveys, setSurveys] = useState([]);

	function loadData() {
		var filter ={};
		//filter.status=2;//status deployed for the surveys on select list
		//filter.project=projectId;//by default we filter by a project id
		console.log("get surveys")
		Api.getSurveys(filter).then((response) => {
			console.log(response.data);
			if (response !== undefined) {
				var pMap = new Map();
				response.data.forEach((project) => {
					pMap.set(project.id, project.name)
				})
				setSurveys(pMap);
			}
		})
			.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { 
		console.log("load surveys");
		loadData({}); }, []);

	return (
		<>
			<SelectList label={"Survey"} values={surveys} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}