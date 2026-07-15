import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import SurveyComponentFillable from "./SurveyComponentFillable";
import Api from "../../../Api.js";
import AlertsPanel from "../../common/AlertsPanel";
import ActionButton from "../../common/ActionButton.js";
/**
 * main component to edit a survey
 */
function SurveyFillable({ survey, patientUuid }) {
  const { t } = useTranslation();
  const [surveyComponents, setSurveyComponents] = useState([]); //array of survey objects for the survey
  const [answers, setAnswers] = useState(new Map()); //answers is a map [surveyComponentId:answer]}
  const [id, setId] = useState(null); //surveyAnswerId, unset until the first save creates it
  const [alerts, setAlerts] = useState([]);
  const [hiddenAlert, setHiddenAlert] = useState(false);

  function closeAlert() { setHiddenAlert(true);}

  //refresh the rendering
  function refreshComponents() {
    Api.getSurveyObjects(survey.id)
      .then((response) => {
        if (response !== undefined) {
          //we must create a new refernce for the array to be able to refresh the component
          setSurveyComponents(response.data);
        }
      })
      .catch((error) => {
        setAlerts([{ message: t("surveyFillable.loadError") + error, type: "error" }]);
      });
  }

  //load the components on startup
  useEffect(() => { refreshComponents(); }, []);

  function onValueChange(surveyComponentId, answer) {setAnswers(new Map(answers.set(surveyComponentId, answer)));}

  function mapToJson(myMap) {
    let result = [];
    for (let [key, value] of myMap) {
      result.push({ surveyComponentId: key, value: value });
    }
    return result;
  }

  function saveForm() {
    setHiddenAlert(false);
    var surveyAnswers = {};
    var errorsForm = 0;
    surveyAnswers.surveyId = survey.id;
    surveyAnswers.patientUuid = patientUuid;
    surveyAnswers.answers = mapToJson(answers);
    //case create or update
    if (errorsForm === 0) {
      if (id != null) {
        surveyAnswers.id = id;
        Api.updateAnswers(surveyAnswers)
          .then((response) => {
            console.log("update answers");
            if (response !== undefined) {
              setAlerts([{ message: t("surveyFillable.updated"), type: "success" }]);
            }
          })
          .catch((error) => {
            setAlerts([{ message: t("surveyFillable.updateError") + error, type: "error" }]);
          });
      } else {
        Api.saveAnswers(surveyAnswers)
          .then((response) => {
            if (response !== undefined) {
              //we must create a new refernce for the array to be able to refresh the component
              //setSurveyComponents(response.data);
              setId(response.data);
              setAlerts([
                {
                  message: t("surveyFillable.saved"),
                  type: "success",
                },
              ]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  return (
    <div className="m-3 w-full">
      <h1>{t('survey.label')} : {survey.name}</h1>
      <div>
        <hr />
        <div className="m-3">
          <div> <b>{t('project.responsible')} :</b> {survey.responsible === 0 ? t('common.undefined') : survey.responsible}</div>
          <div><b>{t('common.uniqueId')} :</b> {survey.id}</div>
        </div>
        <hr />
      </div>
      {hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
      {(surveyComponents == null || surveyComponents.length === 0) && (
        <div className="w-50 m-10 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">{t('surveyEditor.createFirstComponent')}</div>
      )}
      {surveyComponents != null && surveyComponents.map((comp) => <SurveyComponentFillable key={comp.id} surveyComponent={comp} onValueChange={onValueChange} />)}
      <ActionButton name={"saveForm"} text={t('common.save')} onClick={() => saveForm()} />
    </div>
  );
}
export default SurveyFillable;