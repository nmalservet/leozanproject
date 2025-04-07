import React, { useState,useEffect} from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';

/**
 * select list for the statuses. Reusable component
 */

 export default function StatusSelectList({selected,onSelection}) {
	 
	 const [statuses, setStatuses] = useState([]);
	 
	  function loadData(){
       Api.getSurveyStatuses().then((response) => {
         if(response!==undefined){
			 var pMap = new Map();
			 response.data.forEach((p)=>{
				 pMap.set(p.key,p.label)
			 })
          setStatuses(pMap);
         }
        })
        .catch((error) => {(console.error(error))});
    }
    useEffect(() => {loadData({});}, []);
	 
	 return (
		 <>
            <SelectList label={"Status"} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem = {true} emptyAllowed={true}/>
            </>
	 );
	 }