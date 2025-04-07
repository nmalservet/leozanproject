import React, { useState, useEffect } from 'react';
import SelectListMultiple from '../common/SelectListMultiple';
import Api from '../../Api.js';

/**
 * select list for the statuses. Reusable component
 */
export default function StatusSelectListMultiple({ selected, onSelection ,inline}) {

	const [statuses, setStatuses] = useState([]);

	function loadData() {
		Api.getTaskStatuses().then((response) => {
			if (response !== undefined) {
				var pMap = new Map();
				response.data.forEach((p) => {
					pMap.set(p.key, p.label)
				})
				setStatuses(pMap);
			}
		})
			.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { loadData({}); }, []);

	return (<SelectListMultiple label={"Status"} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={inline} />);
}