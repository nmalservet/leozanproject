import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * colors match the SurveyStatus enum on the backend (NEW, VALIDATED, DEPLOYED, DISABLED)
 */
const STATUS_COLORS = {
	NEW: '#94a3b8',
	VALIDATED: '#2563eb',
	DEPLOYED: '#16a34a',
	DISABLED: '#dc2626',
};

/**
 * displays a survey's status as a colored label, green for deployed surveys
 * @param status the raw statusLabel coming from the backend (NEW, VALIDATED, DEPLOYED, DISABLED)
 */
function SurveyStatusLabel({ status }) {
	const { t } = useTranslation();
	const color = STATUS_COLORS[status] || STATUS_COLORS.NEW;
	const label = status ? t('surveyStatus.' + status.toLowerCase(), status) : '';

	return (
		<span className="font-semibold" style={{ color }}>
			{label}
		</span>
	);
}
export default SurveyStatusLabel;
