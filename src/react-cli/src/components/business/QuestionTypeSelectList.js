import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectList from '../common/SelectList';

/**
 * select list for input types.
 * We can retrieve it dynamically later...
 */

export default function QuestionTypeSelectList({ selected, onSelection }) {
	const { t } = useTranslation();
	const [types, setTypes] = useState([]);

	function loadData() {

				var pMap = new Map();
				pMap.set("0", t('questionType.text'));
				pMap.set("1", t('questionType.textArea'));
				pMap.set("2", t('questionType.selectList'));
				pMap.set("3", t('questionType.checkbox'));
				pMap.set("4", t('questionType.date'));
				pMap.set("5", t('questionType.radioButtons'));
				pMap.set("6", t('questionType.file'));
				setTypes(pMap);

	}
	useEffect(() => { loadData({}); }, [t]);

	return (
		<>
			<SelectList label={t('questionType.label')} values={types} selected={selected} handleSelection={onSelection} withFirstItem={true} emptyAllowed={true} inline={true}/>
		</>
	);
}