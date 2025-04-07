import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';

/**
 * select list for comparing data. Used for estimation and progress comparison.
 */
export default function ComparatorSelectList({ name,selected, onSelection }) {

	const [statuses, setStatuses] = useState([]);
	function loadData() {
		var pMap = new Map();
		pMap.set(0, '=');
		pMap.set(1, '>=');
		pMap.set(2, '<=');
		setStatuses(pMap);
	}
	useEffect(() => { loadData({}); }, []);
	return (
		<div className="w-20">
			<SelectList label={name} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</div>
	);
}