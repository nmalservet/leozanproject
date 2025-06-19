import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';

/**
 * select list for the statuses. Reusable component
 */

export default function GenderSelectList({ selected, onSelection }) {

	const [statuses, setStatuses] = useState([]);

	function loadData() {
		var pMap = new Map();
		pMap.set('M', 'Male');
		pMap.set('F', 'Female');
		pMap.set('U', 'Unknown');
		pMap.set('O', 'Other');
		setStatuses(pMap);

	}
	useEffect(() => { loadData({}); }, []);
	return (
		<>
			<SelectList label={"Gender"} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}