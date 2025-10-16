import React from 'react';
import User from './User';
/**
 * Display the task into a modal box
 */
export default function UserModal({ user,onClose }) {
	if (user===undefined||user==null) return <div>ok</div>;

	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Utilisateur #{user.id}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<User initialUser={user}/>
					</div>
				</div>
			</div>
		</div>
	);
}