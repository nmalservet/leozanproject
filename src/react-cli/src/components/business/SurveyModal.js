import React from 'react';
import { useTranslation } from 'react-i18next';
import Survey from './survey/Survey';
/**
 * Display the task into a modal box
 */
export default function SurveyModal({ survey,  onClose }) {
	const { t } = useTranslation();
	if (survey===undefined||survey==null) return null;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{t('survey.label')} #{survey.id}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<Survey initialSurvey={survey}></Survey>
					</div>
				</div>
			</div>
		</div>
	);
}