import React from "react";
import { useState} from "react";
import { Info, X } from "lucide-react";
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
            {icon&&icon.length>0?<button type="button" className="p-1 rounded text-primary-600" onClick={() => show()}><Info size={16} /></button>:<button type="button" className="text-sm border border-primary-700 text-primary-700 hover:bg-primary-50 font-bold py-1 px-2 rounded" onClick={() => show()}>{title}</button>}
        <div  style={styleModal}  >
            <div >
                <div style={styleModalContent}>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                        <h5 className="text-lg font-semibold" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="text-gray-400 hover:text-gray-600" onClick={() => hide()} aria-label="Close">
                            <X size={18} />
                        </button>
                    </div>
                    <div>
                       {text}
                    </div>
                    <div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    );
}
export default ModalWindow;