import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectList from '../common/SelectList';

/**
 * select list for the statuses. Reusable component
 */

export default function GenderSelectList({ selected, onSelection }) {
	const { t } = useTranslation();
	const [statuses, setStatuses] = useState([]);

	function loadData() {
		var pMap = new Map();
		pMap.set('M', t('gender.male'));
		pMap.set('F', t('gender.female'));
		pMap.set('U', t('gender.unknown'));
		pMap.set('O', t('gender.other'));
		setStatuses(pMap);

	}
	useEffect(() => { loadData({}); }, [t]);
	return (
		<>
			<SelectList label={t('gender.label')} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} />
		</>
	);
}