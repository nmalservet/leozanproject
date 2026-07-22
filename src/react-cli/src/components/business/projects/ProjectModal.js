import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import Project from './Project';
/**
 * Display the task into a modal box
 */
export default function ProjectModal({ project,  onClose }) {
	const { t } = useTranslation();
	if (project===undefined||project==null) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="w-full max-w-lg mx-4">
				<div className="bg-white rounded-lg shadow-lg">
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h5 className="text-lg font-semibold">{t('project.label')} #{project.id}</h5>
						<button
							type="button"
							className="text-gray-400 hover:text-gray-600"
							onClick={onClose}
							aria-label="Close"
						><X size={20} /></button>
					</div>
					<div className="p-4">
						<Project initialProject={project}></Project>
					</div>
				</div>
			</div>
		</div>
	);
}