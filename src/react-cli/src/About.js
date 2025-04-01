import React from "react";
import ModalWindow from "./components/common/ModalWindow.js";
/**
 * About component  display button that open a modal. All-in-one
 */
function About(){
    const getContent = () =>{
        return ("Leozan - version 1.0  - Copyright 2025");
    };
    return (
        <div> 
            <ModalWindow title={"About"}text={getContent()} icon={"info-circle"}></ModalWindow>
        </div>     
    )
}
export default About;