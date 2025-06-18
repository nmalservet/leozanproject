import React, { useState, useEffect } from 'react';
import SelectList from '../../common/SelectList';

/**
 * select list for the types. Reusable component.
 */

export default function SurveyObjectTypeSelectList({ selected, onSelection }) {

	const [types, setTypes] = useState([]);

	function loadData() {
		var pMap = new Map();
		
		pMap.set(0, 'QUESTION');
		pMap.set(1, 'TEXT');
		setTypes(pMap);

	}
	useEffect(() => { loadData({}); }, []);
	return (
		<>
			<SelectList label={"Type"} values={types} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={true} />
		</>
	);
}