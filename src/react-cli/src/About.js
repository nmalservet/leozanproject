import React from "react";
import { useTranslation } from 'react-i18next';
import ModalWindow from "./components/common/ModalWindow.js";
/**
 * About component  display button that open a modal. All-in-one
 */
function About(){
    const { t } = useTranslation();
    const getContent = () =>{
        return ("Leozan - version 1.0  - Copyright 2025");
    };
    return (
        <div>
            <ModalWindow title={t('about.title')}text={getContent()} icon={"info-circle"}></ModalWindow>
        </div>
    )
}
export default About;