import React, { useState, useEffect } from "react";
import Grid from "../common/Grid.js";
import Api from '../../Api.js';
import { Modal } from '../common/Modal.js';
import VersionModal from './VersionModal.js';
import ActionButton from '../common/ActionButton.js';
/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function VersionsTable({ projectId}) {

	const columns = [{ "name": "name", "displayed": "name" },
	{ "name": "statusLabel", "displayed": "status" }, { "name": "disabled", "displayed": "disabled" }];
	const buttons = [{ 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];
	const [versionId, setVersionId] = useState(null);//current Version, now for delete
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [versions, setVersions] = useState([]);
	const [editedVersion, setEditedVersion] = useState(null);

	function handleYes() {
		Api.deleteVersion(versionId).then((response) => {
			if (response) {
				setIsModalOpen(false);
				loadData(projectId);
			}
		})
	};

	function handleNo() { setIsModalOpen(false); };

	function deleteVersion(id) {
		setVersionId(id);
		setIsModalOpen(true);
	}

	/**
 * on edit, redirect to the viez edittask
 */
	function editVersion(id) {
		console.log("edit version"+id);
		//open the modal
		versions.forEach((version) => {
			if (version.id === id) {
				setEditedVersion(version)
			}
		})
	}

	/**
	 * callback function to be able to call action on grid
	 */
	function onCallButton(action, id) {
		if (action === "edit")
			editVersion(id);
		if (action === "delete")
			deleteVersion(id);
	}

	function loadData(projectId) {
		var curId=projectId;
		if(projectId===undefined||projectId===null)
			curId=0;//trick to call the whole list
		Api.getVersions(curId)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setVersions([...response.data]);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	useEffect(() => { loadData(projectId); }, [projectId]);

	/**
	 * pn closing the modal we also reload the data.
	 */
	function closeVersionModal() {
		setEditedVersion(null);
		loadData(projectId);
	}
	
	function addVersion(){
		setEditedVersion({});
	}

	return (
		<div className="">
			<VersionModal version={editedVersion} isOpen={editedVersion != null} onClose={() => closeVersionModal()} projectId={projectId}/>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the Version?" />
			<Grid columns={columns} items={versions} buttons={buttons} onCall={onCallButton} ></Grid>
			<ActionButton name={"addVersion"} text={"Add a Version"} onClick={()=>addVersion()}/>
		</div>
	);
}