import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';

/**
 * select list for the priorities. Reusable component
 */

export default function PrioritiesSelectList({ selected, onSelection }) {

	const [priorities, setPriorities] = useState([]);

	function loadData() {
		Api.getPriorities().then((response) => {
			if (response !== undefined) {
				var pMap = new Map();
				response.data.forEach((p) => {
					pMap.set(p.key, p.label)
				})
				setPriorities(pMap);
			}
		})
			.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { loadData({}); }, []);

	return (
		<>
			<div >
				<SelectList label={"Priority"} values={priorities} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
			</div>
		</>
	);
}