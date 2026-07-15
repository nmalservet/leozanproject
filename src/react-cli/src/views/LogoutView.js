import React from "react";
import '../css/login.css';
import { useTranslation } from 'react-i18next';

export default function LogoutView() {
	const { t } = useTranslation();
	return (
		<div className="login-wrapper text-primary-900">
			<h1>{t('logout.thankYou')}</h1>
		</div>
	)
}