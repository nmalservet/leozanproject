import {Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * panel to display a loading icon.
 */
function LoadingPanel() {
	const { t } = useTranslation();

	return (
		<div className="">
			<Loader2 className="w-4 h-4 mr-2 animate-spin" /><span>{t('common.loading')}</span>
		</div>)
		;
}


export default LoadingPanel;