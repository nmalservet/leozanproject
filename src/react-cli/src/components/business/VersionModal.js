import React from 'react';
import { useTranslation } from 'react-i18next';
import Version from './Version';
/**
 * Display the task into a modal box
 */
export default function VersionModal({ version,  onClose,projectId }) {
	const { t } = useTranslation();
	if (version===undefined||version==null) return null;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{t('version.label')} #{version.id}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<Version initialVersion={version} projectId={projectId}></Version>
					</div>
				</div>
			</div>
		</div>
	);
}