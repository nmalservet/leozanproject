import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Api from '../../../Api.js';
import AlertsPanel from '../../common/AlertsPanel';
import InputText from '../../common/InputText.js';
import StatusSelectList from '../StatusSelectList.js';
import QuestionTypeSelectList from '../QuestionTypeSelectList.js';
import { isEmpty } from '../../../utils/StringUtils.js';

import SurveyObjectTypeSelectList from './SurveyObjectTypeSelectList.js';

/**
 * survey component, to create or edit a surveys
 * onSave : action to process on save
 * onCancel action to process on cancel
 */
function SurveyComponent({ surveyComponent, surveyId, readOnly, onSave, onCancel }) {
	const { t } = useTranslation();
	const [sc, setSc] = useState(surveyComponent);
	const [name, setName] = useState(surveyComponent.name ? surveyComponent.name : '');
	const [style, setStyle] = useState(surveyComponent.style);
	const [position, setPosition] = useState(surveyComponent.position);

	const [type, setType] = useState(surveyComponent.type ? surveyComponent.type : 0);
	const [status, setStatus] = useState(surveyComponent.status);

	//if the object is a type question
	const [questionType, setQuestionType] = useState(surveyComponent.questionType);
	//if the object is a type question and a question type select list or radio buttons
	const [values, setValues] = useState(surveyComponent.values);

	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);

	/**
	 * call back if alert to be hidden.
	 */
	function closeAlert() {
		setHiddenAlert(true);
	}

	function save() {
		setHiddenAlert(false);
		//
		if (surveyId != null)
			sc.surveyId = surveyId;
		sc.type = (type) ? type : 0;
		//type is defined
		if (type == undefined || type == null) {
			setAlerts([{ message: t("surveyComponent.typeRequired"), type: "error" }]);
			return;
		}

		if (name == undefined || name == null || isEmpty(name)) {
			setAlerts([{ message: t("surveyComponent.labelRequired"), type: "error" }]);
			return;
		}

		//si c est une question, le type de question est obligatoire
		if (type == 0 && (questionType == undefined || questionType == null)) {
			setAlerts([{ message: t("surveyComponent.questionTypeRequired"), type: "error" }]);
			return;
		}
		sc.name = name;
		//if the component is a quetsion we set the questionType
		sc.questionType = questionType;
		sc.style = (style) ? style : '';
		sc.position = (position) ? position : '';
		sc.status = (status) ? status : 0;

		if (type == 0 && (questionType == 2 || questionType == 5))
			if (values)
				sc.values = values;
			else {
				setAlerts([{ message: t("surveyComponent.valuesRequired"), type: "error" }]);
				return;
			}
		if (!sc.id) {
			Api.addSurveyComponent(sc).then(response => {
				if (response) {
					var s2 = sc;
					s2.id = response.data;
					setSc(s2);
					setAlerts([{ message: t("surveyComponent.created"), type: "success" }]);
					onSave();
				}
			})
		} else {
			Api.updateSurveyObject(sc).then(response => {
				if (response)
					setAlerts([{ message: t("surveyComponent.saved"), type: "success" }]);
				onSave();
			})
		}

	}

	//if cancel, go back to surveys?
	function cancel() {
		console.log("cancel, what to do?");
		onCancel();
	}


	return (
		<div className="border-2 border-dashed rounded-lg">
			<h1>{t('surveyComponent.label')} #{surveyComponent.id}</h1>
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<form >
				<div className="grid grid-col-1 gap-1 m-2">

					<SurveyObjectTypeSelectList selected={type} onSelection={setType} readOnly={readOnly} />
					<p className="italic">{t('surveyComponent.typeHelp')}</p>

					{type == 0 && <div><QuestionTypeSelectList selected={questionType} onSelection={setQuestionType} readOnly={readOnly} />
						<p className="italic">{t('surveyComponent.questionTypeHelp')}</p></div>}

					{type == 0 && (questionType == 2 || questionType == 5) && <div><InputText name={t('surveyComponent.values')} text={values} onTextChange={setValues} inline={true} />
						<p className="italic">{t('surveyComponent.valuesHelp')}</p></div>}

					<InputText name={t('surveyComponent.labelField')} text={name} onTextChange={setName} inline={true} />
					<p className="italic">{t('surveyComponent.labelHelp')}</p>


					<InputText name={t('surveyComponent.style')} text={style} onTextChange={setStyle} inline={true} />
					<p className="italic">{t('surveyComponent.styleHelp')}</p>
					<InputText name={t('surveyComponent.position')} text={position} onTextChange={setPosition} inline={true} />
					<p className="italic">{t('surveyComponent.positionHelp')}</p>
					<div className="grid grid-col-2 gap-1 m-1">
						<StatusSelectList selected={status} onSelection={setStatus} readOnly={readOnly} />
					</div>
				</div>
			</form>
			<div>

			</div>
			<hr />
			<div v-if="readOnly==false" className="grid justify-items-center grid-cols-2">
				{readOnly !== true && <button className="btn btn-outline-secondary ml-10" onClick={() => cancel()}>{t('common.cancel')}</button>}
				{readOnly !== true && <button className="btn btn-outline-primary" onClick={() => save()}>{t('common.save')}</button>}
			</div>
		</div>);
}

export default SurveyComponent;