import { useState } from "react";
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
      setAlerts([{ message: "Le mrn est obligatoire", type: "error" }]);
      errorsForm++;
    }
    if (!patient.name === undefined || patient.name.length === 0) {
      setAlerts([{ message: "Le nom est obligatoire", type: "error" }]);
      errorsForm++;
    }
    if (!patient.firstName === undefined || patient.firstName.length === 0) {
      setAlerts([{ message: "Le prénom est obligatoire", type: "error" }]);
      errorsForm++;
    }
    if (!patient.birthdate === undefined || patient.birthdate.length === 0) {
      setAlerts([{ message: "La date de naissance est obligatoire", type: "error" }]);
      errorsForm++;
    }

    if (errorsForm === 0) {
      if (!patient.id) {
        Api.addPatient(patient).then((response) => {
          if (response) {
            setId(response.data);
            setAlerts([
              { message: "Le patient a été créé", type: "success" },
            ]);
          }
        });
      } else {
        Api.updatePatient(patient).then((response) => {
          if (response)
            setAlerts([
              { message: "Le patient a été enregistré.", type: "success" },
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
          <InputText name={"Nom"} text={name} onTextChange={setName} />
          <InputText
            name={"Prénom"}
            text={firstName}
            onTextChange={setFirstName}
          />
          <InputDate
            name={"Date de naissance"}
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
            className="btn btn-outline-secondary ml-10"
            onClick={() => cancel()}
          >
            Annuler
          </button>
        )}
        {readOnly !== true && (
          <button className="btn btn-outline-primary" onClick={() => save()}>
            Enregistrer
          </button>
        )}
      </div>
    </div>
  );
}

export default Patient;
