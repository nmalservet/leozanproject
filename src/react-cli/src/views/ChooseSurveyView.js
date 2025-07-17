import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from '../Api.js';
import ProjectsSelectList from "../components/business/ProjectsSelectList.js";

/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function ChooseSurveyView() {
	const { patientId } = useParams();
	const [patient, setPatient] = useState(null)

	//load projects

	function loadPatient(id) {
		Api.getPatient(id)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setPatient(response.data);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}


	useEffect(() => {
		if (patientId != null)
			loadPatient(patientId);
	}, [patientId]);

	return (<>  <div>
		<div>{patient && <div>Patient : {patient.name} {patient.firstName} {patient.birthdate}</div>}</div>
		Choose a project : <ProjectsSelectList />
		Choose a survey :
	</div></>

	);
}