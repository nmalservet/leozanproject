import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectList from '../../common/SelectList';

/**
 * select list for the types. Reusable component.
 */

export default function SurveyObjectTypeSelectList({ selected, onSelection }) {
	const { t } = useTranslation();
	const [types, setTypes] = useState([]);

	function loadData() {
		var pMap = new Map();

		pMap.set(0, t('surveyObjectType.question'));
		pMap.set(1, t('surveyObjectType.text'));
		setTypes(pMap);

	}
	useEffect(() => { loadData({}); }, [t]);
	return (
		<>
			<SelectList label={t('surveyObjectType.label')} values={types} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={true} />
		</>
	);
}