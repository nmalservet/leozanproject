import React from 'react';
import Survey from './survey/Survey';
/**
 * Display the task into a modal box
 */
export default function SurveyModal({ survey,  onClose }) {
	if (survey===undefined||survey==null) return null;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Questionnaire #{survey.id}</h5>
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