import React from 'react';
import { useTranslation } from 'react-i18next';
import SelectList from './SelectList.js';

const LANGUAGES = new Map([
	['fr', 'Français'],
	['en', 'English'],
	['de', 'Deutsch'],
]);

/**
 * select list to switch the application language
 */
function LanguageSelectList() {
	const { i18n } = useTranslation();

	function onSelection(lng) {
		i18n.changeLanguage(lng);
	}

	return (
		<SelectList values={LANGUAGES} selected={i18n.resolvedLanguage} handleSelection={onSelection} inline={true} />
	);
}
export default LanguageSelectList;
