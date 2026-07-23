import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * multi-line chart: number of survey responses saved per project, per month.
 * data: [{ projectId, projectName, month ("YYYY-MM"), count }]
 */

const VIEW_W = 720;
const VIEW_H = 320;
const MARGIN = { top: 16, right: 16, bottom: 40, left: 48 };
const PLOT_W = VIEW_W - MARGIN.left - MARGIN.right;
const PLOT_H = VIEW_H - MARGIN.top - MARGIN.bottom;
const MAX_SERIES = 8;

//validated categorical palette, fixed slot order (see dataviz skill palette.md)
const SERIES_COLORS_LIGHT = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7", "#e34948"];
const SERIES_COLORS_DARK = ["#3987e5", "#008300", "#d55181", "#c98500", "#199e70", "#d95926", "#9085e9", "#e66767"];
const OTHER_COLOR = "#898781";

function seriesColorVar(sIdx, isOther) {
	return isOther ? "var(--other)" : `var(--series-${(sIdx % SERIES_COLORS_LIGHT.length) + 1})`;
}

function niceTicks(maxValue, tickCount = 4) {
	if (maxValue <= 0) return [0, 1];
	const rawStep = maxValue / tickCount;
	const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
	const residual = rawStep / magnitude;
	let step;
	if (residual > 5) step = 10 * magnitude;
	else if (residual > 2) step = 5 * magnitude;
	else if (residual > 1) step = 2 * magnitude;
	else step = magnitude;
	const ticks = [];
	for (let v = 0; v <= maxValue + step; v += step) ticks.push(Math.round(v));
	return ticks;
}

export default function ResponsesHistoryChart({ data }) {
	const { t, i18n } = useTranslation();
	const [hover, setHover] = useState(null); //{monthIndex, x, y}
	const [showTable, setShowTable] = useState(false);

	const { months, series, otherIncluded } = useMemo(() => {
		if (!data || data.length === 0) return { months: [], series: [], otherIncluded: false };

		const monthSet = new Set();
		const byProject = new Map(); //projectId -> {name, byMonth: Map}
		data.forEach((row) => {
			monthSet.add(row.month);
			if (!byProject.has(row.projectId))
				byProject.set(row.projectId, { name: row.projectName || t("statistics.unknownProject"), byMonth: new Map() });
			byProject.get(row.projectId).byMonth.set(row.month, row.count);
		});
		const sortedMonths = Array.from(monthSet).sort();

		let projects = Array.from(byProject.values()).map((p) => {
			const values = sortedMonths.map((m) => p.byMonth.get(m) || 0);
			return { name: p.name, values, total: values.reduce((a, b) => a + b, 0) };
		});
		projects.sort((a, b) => b.total - a.total);

		let included = projects;
		let otherIncluded = false;
		if (projects.length > MAX_SERIES) {
			included = projects.slice(0, MAX_SERIES - 1);
			const rest = projects.slice(MAX_SERIES - 1);
			const otherValues = sortedMonths.map((_, i) => rest.reduce((sum, p) => sum + p.values[i], 0));
			included.push({ name: t("statistics.otherProjects"), values: otherValues, total: otherValues.reduce((a, b) => a + b, 0), isOther: true });
			otherIncluded = true;
		}

		return { months: sortedMonths, series: included, otherIncluded };
	}, [data, t]);

	if (!months || months.length === 0) {
		return <div className="text-sm text-gray-500 dark:text-gray-400 italic">{t("statistics.noData")}</div>;
	}

	const maxValue = Math.max(1, ...series.flatMap((s) => s.values));
	const ticks = niceTicks(maxValue);
	const maxTick = ticks[ticks.length - 1];

	function xForIndex(i) {
		return MARGIN.left + (months.length === 1 ? PLOT_W / 2 : (i / (months.length - 1)) * PLOT_W);
	}
	function yForValue(v) {
		return MARGIN.top + PLOT_H - (v / maxTick) * PLOT_H;
	}
	function formatMonth(month) {
		const [y, m] = month.split("-");
		const d = new Date(Number(y), Number(m) - 1, 1);
		return d.toLocaleDateString(i18n.language, { month: "short", year: "2-digit" });
	}

	//show at most ~8 x-axis labels to avoid overlap
	const labelStep = Math.max(1, Math.ceil(months.length / 8));

	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const relX = ((e.clientX - rect.left) / rect.width) * VIEW_W;
		const idx = Math.round(((relX - MARGIN.left) / PLOT_W) * (months.length - 1));
		const clamped = Math.min(Math.max(idx, 0), months.length - 1);
		setHover({ monthIndex: clamped, x: e.clientX - rect.left, y: e.clientY - rect.top });
	}

	const directLabelsAllowed = series.length <= 4;

	return (
		<div className="viz-history">
			<style>{`
				.viz-history {
					--surface: #fcfcfb; --text-secondary: #52514e; --text-muted: #898781; --grid: #e1e0d9; --other: ${OTHER_COLOR};
					${SERIES_COLORS_LIGHT.map((c, i) => `--series-${i + 1}: ${c};`).join(" ")}
				}
				@media (prefers-color-scheme: dark) {
					:root:where(:not([data-theme="light"])) .viz-history {
						--surface: #1a1a19; --text-secondary: #c3c2b7; --text-muted: #898781; --grid: #2c2c2a; --other: ${OTHER_COLOR};
						${SERIES_COLORS_DARK.map((c, i) => `--series-${i + 1}: ${c};`).join(" ")}
					}
				}
				:root[data-theme="dark"] .viz-history {
					--surface: #1a1a19; --text-secondary: #c3c2b7; --text-muted: #898781; --grid: #2c2c2a; --other: ${OTHER_COLOR};
					${SERIES_COLORS_DARK.map((c, i) => `--series-${i + 1}: ${c};`).join(" ")}
				}
			`}</style>
			<div className="relative">
				<svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" onMouseMove={handleMouseMove} onMouseLeave={() => setHover(null)}>
					{ticks.map((tick) => (
						<g key={tick}>
							<line x1={MARGIN.left} x2={MARGIN.left + PLOT_W} y1={yForValue(tick)} y2={yForValue(tick)} stroke="var(--grid)" strokeWidth="1" />
							<text x={MARGIN.left - 8} y={yForValue(tick)} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="var(--text-muted)">{tick.toLocaleString()}</text>
						</g>
					))}
					{months.map((m, i) => (
						i % labelStep === 0 && (
							<text key={m} x={xForIndex(i)} y={VIEW_H - MARGIN.bottom + 18} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{formatMonth(m)}</text>
						)
					))}
					{hover != null && (
						<line x1={xForIndex(hover.monthIndex)} x2={xForIndex(hover.monthIndex)} y1={MARGIN.top} y2={MARGIN.top + PLOT_H} stroke="var(--grid)" strokeWidth="1" />
					)}
					{series.map((s, sIdx) => {
						const color = seriesColorVar(sIdx, s.isOther);
						const points = s.values.map((v, i) => `${xForIndex(i)},${yForValue(v)}`).join(" L ");
						const lastIndex = s.values.length - 1;
						return (
							<g key={s.name}>
								<path d={`M ${points}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<circle cx={xForIndex(lastIndex)} cy={yForValue(s.values[lastIndex])} r="4" fill={color} stroke="var(--surface)" strokeWidth="2" />
								{directLabelsAllowed && (
									<text x={xForIndex(lastIndex) + 8} y={yForValue(s.values[lastIndex])} dominantBaseline="middle" fontSize="10" fill="var(--text-secondary)">{s.name}</text>
								)}
								{hover != null && (
									<circle cx={xForIndex(hover.monthIndex)} cy={yForValue(s.values[hover.monthIndex])} r="4" fill={color} stroke="var(--surface)" strokeWidth="2" />
								)}
							</g>
						);
					})}
				</svg>
				{hover != null && (
					<div
						className="absolute pointer-events-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg text-xs p-2 z-10"
						style={{ left: Math.min(hover.x + 12, 520), top: Math.max(hover.y - 12, 0) }}
					>
						<div className="font-semibold mb-1">{formatMonth(months[hover.monthIndex])}</div>
						{series.map((s, sIdx) => (
							<div key={s.name} className="flex items-center gap-1">
								<span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: seriesColorVar(sIdx, s.isOther) }}></span>
								<span className="text-gray-700 dark:text-gray-300">{s.name}:</span>
								<span className="font-semibold">{s.values[hover.monthIndex]}</span>
							</div>
						))}
					</div>
				)}
			</div>
			{series.length >= 2 && (
				<div className="flex flex-wrap gap-3 mt-2 justify-center">
					{series.map((s, sIdx) => (
						<div key={s.name} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
							<span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seriesColorVar(sIdx, s.isOther) }}></span>
							{s.name}
						</div>
					))}
				</div>
			)}
			<button className="text-xs text-primary-700 dark:text-primary-400 underline mt-2" onClick={() => setShowTable(!showTable)}>
				{showTable ? t("statistics.hideTable") : t("statistics.showTable")}
			</button>
			{showTable && (
				<div className="overflow-x-auto mt-2">
					<table className="table-auto text-xs w-full">
						<thead>
							<tr>
								<th className="text-left p-1">{t("statistics.month")}</th>
								{series.map((s) => <th key={s.name} className="text-right p-1">{s.name}</th>)}
							</tr>
						</thead>
						<tbody>
							{months.map((m, i) => (
								<tr key={m} className="border-t border-gray-200 dark:border-gray-700">
									<td className="p-1">{formatMonth(m)}</td>
									{series.map((s) => <td key={s.name} className="text-right p-1">{s.values[i]}</td>)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{otherIncluded && <div className="text-xs text-gray-400 mt-1">{t("statistics.otherProjectsHint")}</div>}
		</div>
	);
}
