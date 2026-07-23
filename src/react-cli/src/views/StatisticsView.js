import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import Api from '../Api.js';
import AlertsPanel from '../components/common/AlertsPanel';
import LoadingPanel from "../components/common/LoadingPanel.js";
import ResponsesHistoryChart from "../components/business/statistics/ResponsesHistoryChart.js";
import SurveysFilledChart from "../components/business/statistics/SurveysFilledChart.js";

/**
 * statistics page: a few diagrams about survey responses activity per project.
 */
export default function StatisticsView() {
	const { t } = useTranslation();
	const [historyData, setHistoryData] = useState([]);
	const [repartitionData, setRepartitionData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [alerts, setAlerts] = useState([]);
	const [hiddenAlert, setHiddenAlert] = useState(false);

	function closeAlert() {
		setHiddenAlert(true);
	}

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		Promise.all([Api.getResponsesByProjectOverTime(), Api.getSurveysFilledByProject()])
			.then(([historyResponse, repartitionResponse]) => {
				setHistoryData(historyResponse.data);
				setRepartitionData(repartitionResponse.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHiddenAlert(false);
				setAlerts([{ message: t("statistics.loadError") + error, type: "error" }]);
			});
	}, [t]);

	useEffect(() => { fetchData(); }, [fetchData]);

	return (
		<div className="m-3">
			{hiddenAlert === false && <AlertsPanel alerts={alerts} onClose={() => closeAlert()}></AlertsPanel>}
			<h1 className="text-xl font-bold mb-4">{t('statistics.label')}</h1>
			{isLoading && <LoadingPanel />}
			{!isLoading && (
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-4">
						<h2 className="font-semibold mb-2">{t('statistics.historyTitle')}</h2>
						<p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('statistics.historySubtitle')}</p>
						<ResponsesHistoryChart data={historyData} />
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-4">
						<h2 className="font-semibold mb-2">{t('statistics.repartitionTitle')}</h2>
						<p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('statistics.repartitionSubtitle')}</p>
						<SurveysFilledChart data={repartitionData} />
					</div>
				</div>
			)}
		</div>
	);
}
