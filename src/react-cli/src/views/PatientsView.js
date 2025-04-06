import React, { useState, useEffect ,useCallback} from "react";
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import PatientFilter from '../components/business/PatientFilter.js';
import { Modal } from '../components/common/Modal.js';
import { CollapsiblePanel } from "../components/common/CollapsiblePanel.jsx";
import PatientModal from '../components/business/PatientModal.js';
import LoadingPanel  from "../components/common/LoadingPanel.js";


/**
 * @param storedFilter init with the stored filter into the localstorage
 * @returns display the search filter with multiple dynamic fields
 */
export default function PatientsView() {

	const columns = [{ "name": "id", "displayed": "id" }, { "name": "project", "displayed": "project" },
	{ "name": "name", "displayed": "topic" }, { "name": "statusLabel", "displayed": "status" }, { "name": "priorityLabel", "displayed": "priority" }
		, { "name": "responsible", "displayed": "responsible" }, { "name": "startDate", "displayed": "start" }
		, { "name": "endDate", "displayed": "end" }, { "name": "estimatedTime", "displayed": "estimated(h)" }
		, { "name": "progress", "displayed": "progress" }];

	const buttons = [{ 'image': "eye", 'action': 'view' }, { 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];//

	const [tasks, setPatients] = useState([]);

	const [editedPatient, setEditedPatient] = useState(null);
	const [taskId, setPatientId] = useState(null);//current task, now for delete 
	const [filter, setFilter] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading,setIsLoading]=useState(false);

	const handleYes = () => {
		Api.deletePatient(taskId).then((response) => {
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
	function editPatient(id) {
		tasks.forEach((task) => {
			if (task.id === id)
				setEditedPatient(task);
		})
	}

	/**
	 * on edit, redirect to the viez edittask
	 */
	function viewPatient(id) {
		tasks.forEach((task) => {
			if (task.id === id) {
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
		if (action === "edit")
			editPatient(id);
		if (action === "delete")
			deletePatient(id);
		if (action === "view")
			viewPatient(id);
	}

	/**
	 * 
	 */
	function deletePatient(id) {
		setPatientId(id);
		setIsModalOpen(true);
	}
	
	/**
	 * we use async callback function to be used inside the useEffect properly
	 */
	const fetchData=useCallback(async(cfilter) =>{
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
		},[]);
	
	useEffect(() => { fetchData(filter); }, [fetchData,filter]);

	return (
		<div className="">
			<CollapsiblePanel title={"Filter"} children={<PatientFilter onApplyFilter={applyFilter} />} />
			<PatientModal task={editedPatient} isOpen={editedPatient != null} onClose={() => closePatientModal()} readOnly={editedPatient != null && editedPatient.readOnly === true} />
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the task?" />
			<Grid columns={columns} items={tasks} onCall={onCallButton} buttons={buttons} />
			{isLoading&&<LoadingPanel/>}
		</div>
	);
}