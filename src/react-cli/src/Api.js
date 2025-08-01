import axios from "axios";


export default class Api {

	static login(request) {
		var token = Date.now();//we set q defqult token for the first Authorization
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return axios.post("/login", request);
	};
	static logout() { return axios.get("/api/v1/users/logout"); };

	static getPriorities() { return axios.get('/api/v1/options/priorities'); }

	/** save the current filter for surveys in db. Not used yet, design must be refined to have something clear for the user. (no hidden filetr) */
	static updateFilter(filter) { return axios.put('/api/v1/users/filter', filter); }

	/**
	 * projects management
	 */
	static addProject(project) { return axios.post('/api/v1/projects', project); }
	static deleteProject(id) { return axios.delete('/api/v1/projects/' + id); }
	static getProjects() { return axios.get('/api/v1/projects'); }
	static getProjectsEnabled() { return axios.get('/api/v1/projects/enabled'); }
	static updateProject(project) { return axios.put('/api/v1/projects/' + project.id, project); }

	/**
	 * Surveys management
	 */
	static addSurvey(survey) { return axios.post('/api/v1/surveys', survey); }
	static updateSurvey(survey) { return axios.put('/api/v1/surveys/' + survey.id, survey); }
	static deleteSurvey(id) { return axios.delete('/api/v1/surveys/' + id); }
	static getSurvey(id) { return axios.get('/api/v1/surveys/' + id); }
	static getSurveys(filter) { return axios.post('/api/v1/surveys/filter', filter); }
	static getSurveyStatuses() { return axios.get('/api/v1/options/surveyStatuses'); }

	/**
	 * SurveyObjects management
	 */
	static addSurveyComponent(so) { return axios.post('/api/v1/surveycomponents', so); }
	static updateSurveyObject(so) { return axios.put('/api/v1/surveycomponents/' + so.id, so); }
	static deleteSurveyComponent(id) { return axios.delete('/api/v1/surveycomponents/' + id); }
	static getSurveyObjects(id) { return axios.get('/api/v1/surveycomponents/' + id); }
	static searchSurveyObjects(filter) { return axios.post('/api/v1/surveycomponents/filter', filter); }
	static getSurveyObjectStatuses() { return axios.get('/api/v1/options/surveyObjectStatuses'); }

	/**
	 * Patient management
	 */
	static addPatient(patient) { return axios.post('/api/v1/patients', patient); }
	static updatePatient(patient) { return axios.put('/api/v1/patients/' , patient); }
	static deletePatient(uuid) { return axios.delete('/api/v1/patients/' + uuid); }
	static getPatient(uuid) { return axios.get('/api/v1/patients/' + uuid); }
	static getPatients(filter) { return axios.post('/api/v1/patients/filter', filter); }
	/**
	 * Answers management
	 */
	static getAnswers(filter) { return axios.post('/api/v1/answers/filter', filter); }
	
	static saveAnswers(answers){return axios.post('/api/v1/answers',answers);}
	static updateAnswers(answers){return axios.put('/api/v1/answers',answers);}
	
	/**
	 * User management
	 */
	static addUser(user) { return axios.post('/api/v1/users', user); }
	static deleteUser(id) { return axios.delete('/api/v1/users/' + id); }
	static getUsers() { return axios.get('/api/v1/users'); }
	static updateUser(user) { return axios.put('/api/v1/users/' + user.id, user); }

	/**
	 * versions management
	 */
	static addVersion(version) { return axios.post('/api/v1/versions', version); }
	static deleteVersion(id) { return axios.delete('/api/v1/versions/' + id); }
	//if project Id ==0 , retrieve all versions for all projects 
	static getVersions(id) { return axios.get('/api/v1/versions?projectId=' + id); }
	static updateVersion(version) { return axios.put('/api/v1/versions/' + version.id, version); }

}