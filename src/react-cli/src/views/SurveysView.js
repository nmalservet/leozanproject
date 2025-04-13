import React, { useState, useEffect ,useCallback} from "react";
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import SurveyFilter from '../components/business/SurveyFilter.js';
import { Modal } from '../components/common/Modal.js';
import { CollapsiblePanel } from "../components/common/CollapsiblePanel.jsx";
import SurveyModal from '../components/business/SurveyModal.js';
import LoadingPanel  from "../components/common/LoadingPanel.js";


/**
 * @param projectId to filter by project if needed and refresh it directly
 * @param storedFilter init with the stored filter into the localstorage
 * @returns display the search filter with multiple dynamic fields
 */
export default function SurveysView({ projectId }) {

	const columns = [{ "name": "id", "displayed": "id" }, { "name": "projectName", "displayed": "project" },
	{ "name": "name", "displayed": "topic" }, { "name": "statusLabel", "displayed": "status" }
		, { "name": "responsible", "displayed": "responsible" }];

	const buttons = [{ 'image': "eye", 'action': 'view' }, { 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];//

	const [surveys, setSurveys] = useState([]);

	const [editedSurvey, setEditedSurvey] = useState(null);
	const [surveyId, setSurveyId] = useState(null);//current survey, now for delete 
	const [filter, setFilter] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading,setIsLoading]=useState(false);

	const handleYes = () => {
		Api.deleteSurvey(surveyId).then((response) => {
			if (response) {
				setIsModalOpen(false);
				fetchData(filter,projectId);
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
		fetchData(cfilter,projectId);
	}

	/**
	 * on edit, redirect to the viez editsurvey
	 */
	function editSurvey(id) {
		surveys.forEach((survey) => {
			if (survey.id === id)
				setEditedSurvey(survey);
		})
	}

	/**
	 * on edit, redirect to the viez editsurvey
	 */
	function viewSurvey(id) {
		surveys.forEach((survey) => {
			if (survey.id === id) {
				var surveyR = survey;
				surveyR.readOnly = true;
				setEditedSurvey(survey);
			}
		})
	}

	/**
	 * pn closing the modal we also reload the data.
	 */
	function closeSurveyModal() {
		setEditedSurvey(null);
		fetchData({},projectId);
	}

	/**
	 * callback function to be able to call action on grid
	 */
	function onCallButton(action, id) {
		if (action === "edit")
			editSurvey(id);
		if (action === "delete")
			deleteSurvey(id);
		if (action === "view")
			viewSurvey(id);
	}

	/**
	 * 
	 */
	function deleteSurvey(id) {
		setSurveyId(id);
		setIsModalOpen(true);
	}
	
	/**
	 * we use async callback function to be used inside the useEffect properly
	 */
	const fetchData=useCallback(async(cfilter,projId) =>{
			setIsLoading(true);
			var nfilter = cfilter;
			nfilter.projectId = projId;
			Api.getSurveys(nfilter)
				.then((response) => {
					console.log("response surveys");
					if (response !== undefined) {
						//we must create a new refernce for the array to be able to refresh the component
						setSurveys([...response.data]);
						setIsLoading(false);
					}
				})
				.catch((error) => { (console.error(error)) });
		},[]);
	
	useEffect(() => { fetchData(filter,projectId); }, [fetchData,filter, projectId]);

	return (
		<div className="">
			<CollapsiblePanel title={"Filter"} children={<SurveyFilter onApplyFilter={applyFilter} />} />
			<SurveyModal survey={editedSurvey} isOpen={editedSurvey != null} onClose={() => closeSurveyModal()} readOnly={editedSurvey != null && editedSurvey.readOnly === true} />
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title="Confirmation" message="Are you sure you want to delete the survey?" />
			<Grid columns={columns} items={surveys} onCall={onCallButton} buttons={buttons} />
			{isLoading&&<LoadingPanel/>}
		</div>
	);
}