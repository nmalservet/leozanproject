import React, { useState, useEffect,useContext } from "react";
import { useTranslation } from 'react-i18next';
import Grid from "../components/common/Grid.js";
import Api from '../Api.js';
import { Modal } from '../components/common/Modal.js';
import ProjectModal from '../components/business/projects/ProjectModal.js';
import ActionButton from '../components/common/ActionButton.js';
import { ProjectsContext } from '../context/projects-context.js';

/**
 *
 * @returns display the search filter with multiple dynamic fields
 */
export default function ProjectsView() {
	const { t } = useTranslation();
	const columns = [{ "name": "id", "displayed": "Id" }, { "name": "name", "displayed": t("common.name") },
	{ "name": "statusLabel", "displayed": t("status.label") }, { "name": "responsibleUsername", "displayed": t("project.responsible") }, { "name": "disabled", "displayed": t("common.disabled") }];
	const buttons = [{ 'image': "pencil", 'action': 'edit' }, { 'image': "trash", 'action': 'delete' }];
	const [projectId, setProjectId] = useState(null);//current project, now for delete
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [localProjects, setLocalProjects] = useState([]);
	const [editedProject, setEditedProject] = useState(null);
	const {setProjects} = useContext(ProjectsContext);
	//const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	function handleYes() {
		Api.deleteProject(projectId).then((response) => {
			if (response) {
				setIsModalOpen(false);
				loadData();
			}
		})
	};

	function handleNo() { setIsModalOpen(false); };

	function deleteProject(id) {
		setProjectId(id);
		setIsModalOpen(true);
	}

	/**
 * on edit, redirect to the viez edittask
 */
	function editProject(id) {
		//open the modal
		localProjects.forEach((project) => {
			if (project.id === id) {
				setEditedProject(project)
			}
		})
	}

	/**
	 * callback function to be able to call action on grid
	 */
	function onCallButton(action, id) {
		if (action === "edit")
			editProject(id);
		if (action === "delete")
			deleteProject(id);
	}

	function loadData() {
		Api.getProjects()
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					console.log("set projects");
					setLocalProjects([...response.data]);
					//var curUs= currentUser;
					//curUs.countProjects=response.data.length;
					//set projects context
					setProjects([...response.data]);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	useEffect(() => { loadData(); }, []);

	/**
	 * pn closing the modal we also reload the data.
	 */
	function closeProjectModal() {
		setEditedProject(null);
		loadData({});
	}
	
		function addProject(){
		setEditedProject({});
	}

	return (
		<div className="">
			<ProjectModal project={editedProject} isOpen={editedProject != null} onClose={() => closeProjectModal()} />
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onYes={handleYes} onNo={handleNo} title={t("common.confirmation")} message={t("project.confirmDelete")} />
			{(localProjects&&localProjects.length>0)&&<Grid columns={columns} items={localProjects} buttons={buttons} onCall={onCallButton} withFilter={true}/>}
			<ActionButton name={"addProject"} text={t("project.add")} onClick={()=>addProject()}/>
		</div>
	);
}