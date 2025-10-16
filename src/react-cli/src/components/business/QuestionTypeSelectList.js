import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';

/**
 * select list for input types.
 * We can retrieve it dynamically later...
 */

export default function QuestionTypeSelectList({ selected, onSelection }) {

	const [types, setTypes] = useState([]);

	function loadData() {
		
				var pMap = new Map();
				pMap.set("0", "Text");
				pMap.set("1", "Text area");
				pMap.set("2", "Select list");
				pMap.set("3", "Checkbox");
				pMap.set("4", "Date");
				pMap.set("5", "Radio buttons");
				pMap.set("6", "File");
				setTypes(pMap);
			
	}
	useEffect(() => { loadData({}); }, []);

	return (
		<>
			<SelectList label={"Type de question"} values={types} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={true}/>
		</>
	);
}