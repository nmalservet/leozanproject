import React,{useState} from "react";
import { memo } from "react";
/**
 * select list component to display an select list. When the value is selected trigger an event
 * NB : using forEach on Map will not display anything, due to the JSX interpretation.
 * But it does on JS execution...
 * @param values is a Map[key,value] ( javascript map) to display. Display the value, and set the key as selected.
 * @param handleSelection is the function to provide the selection to the parent
 * @param selected the defaultSelection
 * @returns select list component.
 */
 function SelectList({label,values,selected,handleSelection,withFirstItem,emptyAllowed,inline,readOnly}) {
    const [firstItem, setFirstItem] = useState(withFirstItem);

    /**
     * we hide the first item if a selection has been already done
     * @param {*} val 
     */
    function handle(key){
        if(!emptyAllowed)
        setFirstItem(false);
        handleSelection(key);
    }
    

    return (
    <div className={inline==false?'':'flex'}>
            {label&&label.length>0&&<label className={'block font-black mb-1 text-sm font-bold dark:text-white min-w-24'}>{label}</label>}
                {(values&&values.size>0)&&
                    <select disabled={readOnly===true} className="ml-4 bg-gray-50 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={(e) => { handle(e.target.value);}}  defaultValue={selected}>  
                    {firstItem&&<option key='0' id='0' value='' title='' ></option>}
                     {(() => {
                            let options = [];
                            values.forEach((value,key)=> {
                                options.push(<option key={key} id={key} value={key}  title={value} >{value}</option>)
                            })
                            return options;
                        })()}
                        {}
                    </select>   
                }
                {(values===undefined||values===null||values.size===0)&&<div className="col-7"><span >{values}Aucune valeur</span></div>}
        </div>
    );
}
//we use memo to only render if if the props are changed
export default memo(SelectList);