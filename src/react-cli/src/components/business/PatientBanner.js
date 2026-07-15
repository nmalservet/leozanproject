import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * reusable banner for patient.
 */
export default function PatientBanner({ patient}) {
	const { t } = useTranslation();

	return (
		<div className="m-3">
			<span className="font-bold"><h1>{t('patient.label')} :<b> {patient.name}</b>, {patient.firstName} {patient.birthdate}</h1></span>
			<hr style={{border: '1px solid grey'}}/>
		</div>
	);

	}