import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import PatientFilter from '../components/business/PatientFilter.js';
import { Modal } from '../components/common/Modal.js';
import { CollapsiblePanel } from "../components/common/CollapsiblePanel.jsx";
import LoadingPanel from "../components/common/LoadingPanel.js";
import { useNavigate } from "react-router-dom";


/**
 * display the list of answers
 * @param storedFilter init with the stored filter into the localstorage
 * @returns display the search filter with multiple dynamic fields
 */
export default function AnswersView() {

	const columns = [{ "name": "id", "displayed": "Id" },{ "name": "patientLabel", "displayed": "Patient" }, 
	{ "name": "mrn", "displayed": "Mrn" },
	{ "name": "project", "displayed": "Projet" },
	{ "name": "surveyLabel", "displayed": "Questionnaire" },
	{ "name": "updateDate", "displayed": "Mis à jour" },
	{ "name": "uuid", "displayed": "Uuid" },];

	//{ 'image': "file-sliders", 'action': 'chooseSurvey' },
	const buttons = [ { 'image': "eye", 'action': 'view' }, 
		{ 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];//

	const [answers, setAnswers] = useState([]);
	
	const navigate = useNavigate();

	const [editedAnswer, setEditedAnswer] = useState(null);
	const [answerId, setAnswerId] = useState(null);//current task, now for delete 
	const [filter, setFilter] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleYes = () => {
		Api.deleteAnswer(answerId).then((response) => {
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
	function editAnswer(id) {
		answers.forEach((answer) => {
			if (answer.id === id)
				setEditedAnswer(answer);
		})
	}

	/**
	 * on edit, redirect to the viez edittask
	 */
	function viewAnswer(id) {
		answers.forEach((task) => {
			if (task.uuid === id) {
				var taskR = task;
				taskR.readOnly = true;
				setEditedAnswer(task);
			}
		})
	}

	/**
	 * callback function to be able to call action on grid
	 */
	function onCallButton(action, id) {
		console.log("choosed id:"+id);
		if (action === "edit")
			editAnswer(id);
		if (action === "delete")
			deleteAnswer(id);
		if (action === "view")
			viewAnswer(id);
		if (action === "chooseSurvey")
			chooseSurvey(id);
	}

	/**
	 * 
	 */
	function deleteAnswer(id) {
		setAnswerId(id);
		setIsModalOpen(true);
	}

	/**
	 * we use async callback function to be used inside the useEffect properly
	 */
	const fetchData = useCallback(async (cfilter) => {
		setIsLoading(true);
		Api.getAnswers(cfilter)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setAnswers([...response.data]);
					setIsLoading(false);
				}
			})
			.catch((error) => { (console.error(error)) });
	}, []);

	useEffect(() => { fetchData(filter); }, [fetchData, filter]);

	return (
		<div className="">
			<CollapsiblePanel title={"Filter"} children={<PatientFilter onApplyFilter={applyFilter} />} />
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the answer?" />
			<Grid columns={columns} items={answers} onCall={onCallButton} buttons={buttons} />
			{isLoading && <LoadingPanel />}
		</div>
	);
}