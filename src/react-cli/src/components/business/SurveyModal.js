import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import Survey from './survey/Survey';
/**
 * Display the task into a modal box
 */
export default function SurveyModal({ survey,  onClose }) {
	const { t } = useTranslation();
	if (survey===undefined||survey==null) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="w-full max-w-lg mx-4">
				<div className="bg-white rounded-lg shadow-lg">
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h5 className="text-lg font-semibold">{t('survey.label')} #{survey.id}</h5>
						<button
							type="button"
							className="text-gray-400 hover:text-gray-600"
							onClick={onClose}
							aria-label="Close"
						><X size={20} /></button>
					</div>
					<div className="p-4">
						<Survey initialSurvey={survey}></Survey>
					</div>
				</div>
			</div>
		</div>
	);
}