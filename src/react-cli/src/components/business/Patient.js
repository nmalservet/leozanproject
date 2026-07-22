import { useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../Api.js";
import AlertsPanel from "../common/AlertsPanel";
import InputText from "../common/InputText.js";
import InputDate from "../common/InputDate.js";
import GenderSelectList from "./GenderSelectList.js";
//import {isEmpty} from '../../utils/StringUtils.js'

/**
 * patientcomponent, to create or edit a tasks
 */
function Patient({ initialPatient, readOnly }) {
  const { t } = useTranslation();
  const [id, setId] = useState(initialPatient ? initialPatient.id : null);
  const [name, setName] = useState(initialPatient ? initialPatient.name : "");
  const [firstName, setFirstName] = useState(
    initialPatient ? initialPatient.firstName : ""
  );
  const [birthdate, setBirthdate] = useState(
    initialPatient ? initialPatient.birthdate : ""
  );
  const [gender, setGender] = useState(
    initialPatient ? initialPatient.gender : ""
  );
  const [ssn, setSsn] = useState(initialPatient ? initialPatient.ssn : "");
  const [mrn, setMrn] = useState(initialPatient ? initialPatient.mrn : "");
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
    let patient = {};
    patient.id = id;
    patient.name = name;
    patient.firstName = firstName;
    patient.birthdate = birthdate;
    patient.gender = gender;
    patient.ssn = ssn;
    patient.mrn = mrn;

    var errorsForm = 0;
    if (!patient.mrn === undefined || patient.mrn.length === 0) {
      setAlerts([{ message: t("patient.mrnRequired"), type: "error" }]);
      errorsForm++;
    }
    if (!patient.name === undefined || patient.name.length === 0) {
      setAlerts([{ message: t("patient.nameRequired"), type: "error" }]);
      errorsForm++;
    }
    if (!patient.firstName === undefined || patient.firstName.length === 0) {
      setAlerts([{ message: t("patient.firstNameRequired"), type: "error" }]);
      errorsForm++;
    }
    if (!patient.birthdate === undefined || patient.birthdate.length === 0) {
      setAlerts([{ message: t("patient.birthdateRequired"), type: "error" }]);
      errorsForm++;
    }

    if (errorsForm === 0) {
      if (!patient.id) {
        Api.addPatient(patient).then((response) => {
          if (response) {
            setId(response.data);
            setAlerts([
              { message: t("patient.created"), type: "success" },
            ]);
          }
        });
      } else {
        Api.updatePatient(patient).then((response) => {
          if (response)
            setAlerts([
              { message: t("patient.saved"), type: "success" },
            ]);
        });
      }
    }
  }

  //if cancel, go back to tasks?
  function cancel() {
    console.log("cancel, what to do?");
  }

  return (
    <div className="max-w-2xl ">
      {hiddenAlert === false && (
        <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>
      )}
      <form>
        <div className="grid grid-col-1 gap-1 m-2">
          <div className="">
            {initialPatient && (
              <label>
                #{" "}
                <span style={{ marginLeft: "10px" }}>{initialPatient.id}</span>
              </label>
            )}
          </div>
          <InputText name={t("patient.name")} text={name} onTextChange={setName} />
          <InputText
            name={t("patient.firstName")}
            text={firstName}
            onTextChange={setFirstName}
          />
          <InputDate
            name={t("patient.birthdate")}
            text={birthdate}
            onTextChange={setBirthdate}
          />
          <InputText name={"SSN"} text={ssn} onTextChange={setSsn} />
          <InputText name={"MRN"} text={mrn} onTextChange={setMrn} />
          <GenderSelectList selected={gender} onSelection={setGender} readOnly={readOnly} />
        </div>
      </form>
      <div
        v-if="readOnly==false"
        className="grid justify-items-center grid-cols-2"
      >
        {readOnly !== true && (
          <button
            className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-bold py-1 px-3 rounded ml-10"
            onClick={() => cancel()}
          >
            {t("common.cancel")}
          </button>
        )}
        {readOnly !== true && (
          <button className="border border-primary-700 text-primary-700 hover:bg-primary-50 font-bold py-1 px-3 rounded" onClick={() => save()}>
            {t("common.save")}
          </button>
        )}
      </div>
    </div>
  );
}

export default Patient;
