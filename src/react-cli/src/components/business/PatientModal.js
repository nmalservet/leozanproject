import React from 'react';
import Patient from './Patient';
/**
 * Display the patient into a modal box
 */
export default function PatientModal({ patient, isOpen, onClose,readOnly }) {
	if (!isOpen) return null;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Patient #{patient.id}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<Patient initialPatient={patient} readOnly={readOnly}></Patient>
					</div>
				</div>
			</div>
		</div>
	);
}