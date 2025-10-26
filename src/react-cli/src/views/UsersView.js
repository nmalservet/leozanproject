import React, { useState, useEffect } from "react";
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import { Modal } from '../components/common/Modal.js';
import UserModal from '../components/business/users/UserModal.js';
import ActionButton from '../components/common/ActionButton.js';
import AlertsPanel from '../components/common/AlertsPanel';
/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function UsersView() {

	const columns = [{ "name": "id", "displayed": "Id" }, { "name": "name", "displayed": "Nom" }, { "name": "firstName", "displayed": "Prénom" }, { "name": "username", "displayed": "Utilisateur" },
	{ "name": "email", "displayed": "Email" }, { "name": "roleLabel", "displayed": "Rôle" }, { "name": "disabled", "displayed": "Inactif" }];
	const [userId, setUserId] = useState(null);//current project, now for delete
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [editedUser, setEditedUser] = useState(null);
	const buttons = [{'image':"pencil",'action':'edit'},{'image':"trash",'action':'delete'}];
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);

	function handleYes() {
		Api.deleteUser(userId).then((response) => {
			if (response) {
				setIsModalOpen(false);
				loadData();
				setAlerts([{ message: "L utilisateur a été supprimé", type: "success" }]);
			}
		})

	};

	function handleNo() {
		setIsModalOpen(false);
	};

	function deleteUser(id) {
		setUserId(id);
		setIsModalOpen(true);
	}
	function addUser(){
		setEditedUser({});
	}

	/**
 * on edit, redirect to the viez edittask
 */
	function editUser(id) {
		users.forEach((user) => {
			if (parseInt(user.id)=== parseInt(id)) {
				setEditedUser(user);
			}
		})
	}

	/**
	 * pn closing the modal we also reload the data.
	 */
	function closeUserModal() {
		setEditedUser(null);
		loadData({});
	}
	
	/**
		 * callback function to be able to call action on grid
		 */
		function onCallButton(action,id){
			if(action==="edit")
				editUser(id);
			if(action==="delete")
				deleteUser(id);
		}
	
	function loadData() {
		Api.getUsers()
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setUsers([...response.data]);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	
	/**
		 * call back if alert to be hidden.
		 */
		function closeAlert() {
			setHiddenAlert(true);
		}
		
	useEffect(() => { loadData({}); }, [userId]);

	return (
		<div className="">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			{editedUser!=null&&<UserModal user={editedUser} onClose={() => closeUserModal()} />}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Êtes-vous sûr de vouloir supprimer l'utilisateur?" />
			<Grid columns={columns} items={users} onCall={onCallButton} buttons={buttons} withFilter={true}/>
			<ActionButton name={"addUser"} text={"Ajouter un utilisateur"} onClick={()=>addUser()}/>
		</div>
	);
}