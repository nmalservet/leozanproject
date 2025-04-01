import React, { useState, useEffect } from 'react';
import SelectList from '../common/SelectList';
import Api from '../../Api.js';

/**
 * select list for the projects. Reusable component
 */

export default function UsersSelectList({ label, selected, onSelection, inline }) {

	const [users, setUsers] = useState([]);
	function loadData() {
		Api.getUsers().then((response) => {
			console.log(response);
			if (response !== undefined) {
				var pMap = new Map();
				response.data.forEach((u) => {
					pMap.set(u.id, u.name)
				})
				setUsers(pMap);
			}
		})
			.catch((error) => { (console.error(error)) });
	}
	useEffect(() => { loadData({}); }, []);
	return (<SelectList label={label} values={users} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={inline} />);
}