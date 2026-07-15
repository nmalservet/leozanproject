import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectList from '../common/SelectList';

/**
 * select list for the statuses. Reusable component
 */

export default function RoleSelectList({ selected, onSelection }) {
	const { t } = useTranslation();
	const [statuses, setStatuses] = useState([]);

	function loadData() {
		var pMap = new Map();
		pMap.set(0, t('role.guest'));
		pMap.set(1, t('role.manager'));
		pMap.set(2, t('role.administrator'));
		setStatuses(pMap);

	}
	useEffect(() => { loadData({}); }, [t]);
	return (
		<>
			<SelectList label={t('role.label')} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}