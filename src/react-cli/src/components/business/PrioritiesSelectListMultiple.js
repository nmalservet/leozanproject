import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectListMultiple from '../common/SelectListMultiple';
import Api from '../../Api.js';

/**
 * select list for the statuses. Reusable component
 */
export default function PrioritiesSelectListMultiple({ selected, onSelection,inline }) {
	const { t } = useTranslation();
	const [statuses, setStatuses] = useState([]);

	function loadData() {
		Api.getPriorities().then((response) => {
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

	return (<SelectListMultiple label={t('priority.label')} values={statuses} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={inline}/>);
}