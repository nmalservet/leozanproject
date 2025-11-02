import React, { useState, useEffect } from "react";
import SurveyComponentFillable from "./SurveyComponentFillable";
import Api from "../../../Api.js";
import AlertsPanel from "../../common/AlertsPanel";

import ActionButton from "../../common/ActionButton.js";
/**
 * main component to edit a survey
 */
export default function SurveyResponse({ surveyResponse, readOnly }) {
  const [survey] = useState(surveyResponse.survey);
  const [surveyComponents,setSurveyComponents] = useState([]); //array of survey objects for the survey
  const [patient] = useState(surveyResponse.patient);
  const [answers, setAnswers] = useState(arrayToMap(surveyResponse.answers)); //answers is a map [surveyComponentId:answer]}
  const [id, setId] = useState(null); //surveyAnswerId
  const [alerts, setAlerts] = useState([]);
  const [hiddenAlert, setHiddenAlert] = useState(false);

  function closeAlert() {
    setHiddenAlert(true);
  }

  /**
   * convert the array answers to a map
   */
  function arrayToMap(arr) {
    console.log("arrToMap");
    console.log(arr);
    var myMap = new Map();
    if (arr && arr.length > 0)
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        var key = arr[i].surveyComponentId;
        var val = arr[i].value;
        myMap.set(key, val);
      }
    // myMap.set("1",2);
    //  myMap.set(1,"2");
    return myMap;
  }

  function onValueChange(surveyComponentId, answer) {
    //save the answer
    console.log("save answer:" + surveyComponentId + ":" + answer);
    //if(answers.get(surveyComponentId))
    //setAnswers(new Map(answers.set(surveyComponentId, answer)));
     setAnswers(new Map(answers.set(surveyComponentId, answer)));
  }

  /**
   * get the answer provided on a the response
   * @param {} surveyVComponentId
   */
  function getAnswer(surveyComponentId) {
    console.log("get answer:"+surveyComponentId+""+answers.get(surveyComponentId))
    if (surveyComponentId != null) {
      return answers.get(surveyComponentId);
      }
    return "";
  }

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
    surveyAnswers.patientUuid = patient.uuid;

    surveyAnswers.answers = mapToJson(answers);
    //case create or update
    if (errorsForm === 0) {
      if (id != null) {
        surveyAnswers.id = id;
        Api.updateAnswers(surveyAnswers)
          .then((response) => {
            if (response !== undefined) {
              console.log("Updated ok");
              //we must create a new refernce for the array to be able to refresh the component
              //setSurveyComponents(response.data);
              //setSurveyAnswersId(response.data.id);
              setAlerts([
                {
                  message: "Le questionnaire a été mis à jour",
                  type: "success",
                },
              ]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("save answers");
        Api.saveAnswers(surveyAnswers)
          .then((response) => {
            if (response !== undefined) {
              //we must create a new refernce for the array to be able to refresh the component
              //setSurveyComponents(response.data);
              setId(response.data);
              setAlerts([
                {
                  message: "Le questionnaire a été enregistré",
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

  useEffect(() => {
    console.log("load answers:");
    //var ans = arrayToMap(surveyResponse.answers);
    //setAnswers();
    //we agregate the initial value on each component to avoid to refresh it in a bad order
    let objs =[];
    for (let i = 0; i < surveyResponse.surveyObjects.length; i++) {
        let comp =surveyResponse.surveyObjects[i];
        comp.initialValue=answers.get(comp.id);
        objs.push(comp);
       // console.log(comp);
      }
      setSurveyComponents(objs);
  }, []);
  return (
    <div className="m-3 w-full">
      <h1>Questionnaire : {survey.name}</h1>
      <div>
        <div className="m-3">
          <div>
            <b>Responsable :</b>{" "}
            {survey.responsible === 0 ? "Not yet defined" : survey.responsible}
          </div>
          <div>
            <b>Identifiant unique :</b> {survey.id}
          </div>
        </div>
        <hr />
      </div>
      {hiddenAlert === false && (
        <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>
      )}
      {(surveyComponents == null || surveyComponents.length === 0) && (
        <div className="w-50 m-10 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
          You must add your first component!
        </div>
      )}
      {surveyComponents != null &&
        surveyComponents.map((comp) => (
          <SurveyComponentFillable surveyComponent={comp} onValueChange={onValueChange} readOnly={readOnly}/>
        ))}

      {readOnly === false && (
        <ActionButton
          name={"saveForm"}
          text={"Enregistrer"}
          onClick={() => saveForm()}
        />
      )}
    </div>
  );
}
