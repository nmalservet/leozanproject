import React from "react";
import { useTranslation } from 'react-i18next';

/**
 *
 * @returns display the search filter with multiple dynamic fields
 */
export default function ResourcesView  ()  {
    const { t } = useTranslation();
    return (
        <div className="row" >{t('resources.placeholder')}</div>
);
}