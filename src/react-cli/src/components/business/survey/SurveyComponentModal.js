import React from 'react';
import { X } from 'lucide-react';
import SurveyComponent from './SurveyComponent';
/**
 * Display the task into a modal box
 */
export default function SurveyComponentModal({ surveyComponent,surveyId,  onClose }) {
	return (
		<div className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="mt-10 grid place-content-center">
				<div className="bg-white rounded-lg shadow-lg">
					<div className="flex items-center justify-end p-4 border-b border-gray-200">
						<button
							type="button"
							className="text-gray-400 hover:text-gray-600"
							onClick={onClose}
							aria-label="Close"
						><X size={20} /></button>
					</div>
					<div className="p-4">
						<SurveyComponent surveyComponent={surveyComponent} surveyId={surveyId} onSave={onClose} onCancel={onClose}/>
					</div>
				</div>
			</div>
		</div>
	);
}