import React from 'react';

/**
 * reusable banner for patient.
 */
export default function PatientBanner({ patient}) {
	
	return (
		<div className="m-3">
			<span className="font-bold"><h1>Patient :<b> {patient.name}</b>, {patient.firstName} {patient.birthdate}</h1></span>
			<hr style={{border: '1px solid grey'}}/>
		</div>
	);
	
	}