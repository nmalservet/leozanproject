import React from "react";
import { useTranslation } from 'react-i18next';

/**
 *
 * @returns display the search filter with multiple dynamic fields
 */
export default function DashboardView  ()  {
    const { t } = useTranslation();
    return (
        <div className="flex flex-wrap -mx-4" >{t('dashboard.placeholder')}</div>
);
}