import React from 'react';
import Project from './Project';
/**
 * Display the task into a modal box
 */
export default function ProjectModal({ project,  onClose }) {
	if (project===undefined||project==null) return null;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Projet #{project.id}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<Project initialProject={project}></Project>
					</div>
				</div>
			</div>
		</div>
	);
}