import React from 'react';
import SurveyComponent from './SurveyComponent';
/**
 * Display the task into a modal box
 */
export default function SurveyComponentModal({ surveyComponent,surveyId,  onClose }) {
	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<SurveyComponent surveyComponent={surveyComponent} surveyId={surveyId} onSave={onClose} onCancel={onClose}/>
					</div>
				</div>
			</div>
		</div>
	);
}