import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import PatientFilter from '../components/business/PatientFilter.js';
import { Modal } from '../components/common/Modal.js';
import { CollapsiblePanel } from "../components/common/CollapsiblePanel.jsx";
import PatientModal from '../components/business/PatientModal.js';
import LoadingPanel from "../components/common/LoadingPanel.js";
import ActionButton from '../components/common/ActionButton.js';
import { useNavigate } from "react-router-dom";


/**
 * @param storedFilter init with the stored filter into the localstorage
 * @returns display the search filter with multiple dynamic fields
 */
export default function PatientsView() {

	const columns = [{ "name": "name", "displayed": "Nom" }, { "name": "firstName", "displayed": "Prénom" },
	{ "name": "birthdate", "displayed": "Date de naissance" },
	{ "name": "gender", "displayed": "Genre" },
	{ "name": "mrn", "displayed": "Mrn" },{ "name": "ssn", "displayed": "Ssn" },
	{ "name": "uuid", "displayed": "Uuid" },];

	const buttons = [{ 'image': "file-sliders", 'action': 'chooseSurvey' }, { 'image': "eye", 'action': 'view' }, { 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];//

	const [patients, setPatients] = useState([]);
	
	const navigate = useNavigate();

	const [editedPatient, setEditedPatient] = useState(null);
	const [patientUuid, setPatientUuid] = useState(null);//current task, now for delete 
	const [filter, setFilter] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleYes = () => {
		Api.deletePatient(patientUuid).then((response) => {
			if (response) {
				setIsModalOpen(false);
				fetchData(filter);
			}
		})

	};

	const handleNo = () => {
		setIsModalOpen(false);
	};

	/**
	 * we will store the filter later in db if necessary but the added vaue is not really visible.
	 */
	function applyFilter(cfilter) {
		setFilter(cfilter);
		fetchData(cfilter);
	}

	/**
	 * on edit, redirect to the viez edittask
	 */
	function chooseSurvey(id) {
		console.log("choosed patient:"+id);
		navigate('/chooseSurvey/' + id);
	}

	/**
	 * on edit, redirect to the viez edittask
	 */
	function editPatient(uuid) {
		patients.forEach((task) => {
			if (task.uuid === uuid)
				setEditedPatient(task);
		})
	}

	/**
	 * on edit, redirect to the viez edittask
	 */
	function viewPatient(uuid) {
		patients.forEach((task) => {
			if (task.uuid === uuid) {
				var taskR = task;
				taskR.readOnly = true;
				setEditedPatient(task);
			}
		})
	}

	/**
	 * pn closing the modal we also reload the data.
	 */
	function closePatientModal() {
		setEditedPatient(null);
		fetchData({});
	}

	/**
	 * callback function to be able to call action on grid
	 */
	function onCallButton(action, id) {
		console.log("choosed id:"+id);
		if (action === "edit")
			editPatient(id);
		if (action === "delete")
			deletePatient(id);
		if (action === "view")
			viewPatient(id);
		if (action === "chooseSurvey")
			chooseSurvey(id);
	}

	/**
	 * 
	 */
	function deletePatient(id) {
		setPatientUuid(id);
		setIsModalOpen(true);
	}

	function addPatient() {
		console.log("set edited patient");
		setEditedPatient({});
	}

	/**
	 * we use async callback function to be used inside the useEffect properly
	 */
	const fetchData = useCallback(async (cfilter) => {
		setIsLoading(true);
		Api.getPatients(cfilter)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setPatients([...response.data]);
					setIsLoading(false);
				}
			})
			.catch((error) => { (console.error(error)) });
	}, []);

	useEffect(() => { fetchData(filter); }, [fetchData, filter]);

	return (
		<div className="">
			<CollapsiblePanel title={"Filter"} children={<PatientFilter onApplyFilter={applyFilter} />} />
			{editedPatient !== undefined && editedPatient !== null && <PatientModal patient={editedPatient} onClose={() => closePatientModal()} readOnly={editedPatient != null && editedPatient.readOnly === true} />}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the patient?" />
			<Grid columns={columns} items={patients} onCall={onCallButton} buttons={buttons} />
			{isLoading && <LoadingPanel />}
			<ActionButton name={"addPatient"} text={"Ajouter un patient"} onClick={() => addPatient()} />
		</div>
	);
}