import React from "react";
import { useState} from "react";
/**
 * modal window
 * @param handleClick is the function to use when the click is done
 */
 function ModalWindow({title,text,icon}) {
    const[display, setDisplay]= useState(false);

    const styleModal={
            display: display===true?"block":"none", /* Hidden by default */
            position: "fixed", /* Stay in place */
            zIndex:" 1", /* Sit on top */
            paddingTop: "100px", /* Location of the box */
            left: 0,
            top: 0,
            width: "100%", /* Full width */
            height: "100%", /* Full height */
            overflow: "auto", /* Enable scroll if needed */
            backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */     
    };

    const styleModalContent= {
        backgroundColor: "#fefefe",
        margin: "auto",
        padding: "20px",
        border: "1px solid #888",
        width: "60%"
      }

    function show(){setDisplay(true); }

    function hide() {setDisplay(false);}
    return (
        <div>
            {icon&&icon.length>0?<button type="button" className="btn btn-sm" onClick={() => show()}><em className={"bi bi-"+icon+" text-primary"}> </em></button>:<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => show()}>{title}</button>}
        <div  style={styleModal}  >
            <div >
                <div style={styleModalContent}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn btn-secondary" onClick={() => hide()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                       {text}
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
    </div>
    </div>
    );
}
export default ModalWindow;