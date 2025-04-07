import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';

/**
 * select list for the statuses. Reusable component
 */

export default function RoleSelectList({ selected, onSelection }) {

	const [statuses, setStatuses] = useState([]);

	function loadData() {
		var pMap = new Map();
		pMap.set(0, 'GUEST');
		pMap.set(1, 'MANAGER');
		pMap.set(2, 'ADMINISTRATOR');
		setStatuses(pMap);

	}
	useEffect(() => { loadData({}); }, []);
	return (
		<>
			<SelectList label={"Status"} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}