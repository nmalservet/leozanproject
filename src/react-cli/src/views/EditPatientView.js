import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Patient from '../components/business/Patient';
import Api from '../Api.js';

/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function EditPatientView() {
	const { patientId } = useParams();
	const [patient, setPatient] = useState(null)

	function loadData(id) {
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
			loadData(patientId);
	}, [patientId]);

	return (<> {patient != null && <Patient initialPatient={patient}></Patient>}</>

	);
}