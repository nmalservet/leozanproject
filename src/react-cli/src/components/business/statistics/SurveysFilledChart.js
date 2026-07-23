import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * horizontal bar chart: total number of survey responses saved per project (all time).
 * data (already sorted desc by count): [{ projectId, projectName, count }]
 */

const VIEW_W = 720;
const ROW_H = 32;
const BAR_H = 20;
const MARGIN = { top: 8, right: 56, bottom: 8, left: 160 };
const PLOT_W = VIEW_W - MARGIN.left - MARGIN.right;

function roundedRightPath(x, y, width, height, radius) {
	const r = Math.min(radius, height / 2, Math.max(width, 0));
	if (width <= 0) return `M ${x},${y} H ${x} V ${y + height} H ${x} Z`;
	return `M ${x},${y} H ${x + width - r} Q ${x + width},${y} ${x + width},${y + r} V ${y + height - r} Q ${x + width},${y + height} ${x + width - r},${y + height} H ${x} Z`;
}

export default function SurveysFilledChart({ data }) {
	const { t } = useTranslation();
	const [showTable, setShowTable] = useState(false);

	const rows = useMemo(() => (data || []).map((d) => ({ id: d.projectId, name: d.projectName || t("statistics.unknownProject"), count: d.count })), [data, t]);

	if (rows.length === 0) {
		return <div className="text-sm text-gray-500 dark:text-gray-400 italic">{t("statistics.noData")}</div>;
	}

	const maxValue = Math.max(1, ...rows.map((r) => r.count));
	const viewH = MARGIN.top + MARGIN.bottom + rows.length * ROW_H;

	function widthFor(value) {
		return (value / maxValue) * PLOT_W;
	}

	return (
		<div className="viz-repartition">
			<style>{`
				.viz-repartition .viz-bar { fill: #2a78d6; }
				@media (prefers-color-scheme: dark) {
					:root:where(:not([data-theme="light"])) .viz-repartition .viz-bar { fill: #3987e5; }
				}
				:root[data-theme="dark"] .viz-repartition .viz-bar { fill: #3987e5; }
			`}</style>
			<svg viewBox={`0 0 ${VIEW_W} ${viewH}`} width="100%">
				{rows.map((row, i) => {
					const y = MARGIN.top + i * ROW_H + (ROW_H - BAR_H) / 2;
					const w = widthFor(row.count);
					return (
						<g key={row.id}>
							<text x={MARGIN.left - 10} y={y + BAR_H / 2} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="#52514e" className="dark:fill-gray-300">
								{row.name}
							</text>
							<path className="viz-bar" d={roundedRightPath(MARGIN.left, y, w, BAR_H, 4)} />
							<text x={MARGIN.left + w + 8} y={y + BAR_H / 2} dominantBaseline="middle" fontSize="11" fontWeight="600" fill="#0b0b0b" className="dark:fill-white">
								{row.count.toLocaleString()}
							</text>
						</g>
					);
				})}
			</svg>
			<button className="text-xs text-primary-700 dark:text-primary-400 underline mt-2" onClick={() => setShowTable(!showTable)}>
				{showTable ? t("statistics.hideTable") : t("statistics.showTable")}
			</button>
			{showTable && (
				<div className="overflow-x-auto mt-2">
					<table className="table-auto text-xs w-full">
						<thead>
							<tr>
								<th className="text-left p-1">{t("project.label")}</th>
								<th className="text-right p-1">{t("statistics.responsesCount")}</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<tr key={row.id} className="border-t border-gray-200 dark:border-gray-700">
									<td className="p-1">{row.name}</td>
									<td className="text-right p-1">{row.count}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
