import { useState } from "react";
import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine, ArrowUp, ArrowDown, ArrowUpDown} from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';

/**
 * Component to display items in a grid.
 * Params : 
 *  - items :               Items to display
 *  - columns :    columns as json array a column is a json : {"name":"colName","displayed":"translatedName"}
 *  - buttons: list of buttons like : const buttons = [{'image':"pencil",'action':'edit'},{'image':"trash",'action':'delete'}]
 * - onCall : implement a function to be called that will receive as parameters the action name and the row id. ex : function onCallButton(action,id)
 * -withFilter : display the column filter, if true display it otherwise it's not displayed
 * 
 */

function Grid({ items, columns, onCall, buttons, withFilter }) {
	//Used to display from initial items list
	const [currentPage, setCurrentPage] = useState(1);
	const maxPerPage = 15;
	const [sortKey, setSortKey] = useState(null);
	const [sortAsc, setSortAsc] = useState(true);
	const [rows, setRows] = useState(null);//bad idea to init with items, it will not be refreshed, we use it only if it set.

	function handleSort(key) {

		if (key === sortKey) {
			setSortAsc(!sortAsc);
		} else {
			setSortKey(key);
			setSortAsc(true);
		}
		var it = items;
		const sortedItems = it.sort((a, b) => {
			const valueA = a[key];
			const valueB = b[key];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				return sortAsc
					? valueB.localeCompare(valueA)
					: valueA.localeCompare(valueB);
			}

			return sortAsc
				? Number(valueB) - Number(valueA)
				: Number(valueA) - Number(valueB);
		});
		setRows(sortedItems);
	};

	/**
	 * display the right arrow according to the current sort
	 * @param {*} key 
	 * @returns 
	 */
	const getSortIndicator = (key) => {
		if (sortKey !== key) return <ArrowUpDown size={16} />;
		return (sortAsc === true) ? <ArrowDown size={16} /> : <ArrowUp size={16} />;
	};

	function computeCountPages(i) {
		return Math.trunc(i / maxPerPage) + 1;
	}

	function filter(columnName, value) {
		var it = [...items];
		it = items.filter(item => String(item[columnName]).toLowerCase().includes(value.toLowerCase()));
		setRows(it);
	}

	return (items ?
		<>
			<table className="table table-striped table-bordered">
				<thead className="thead-light">
					<tr>
						{columns.map((column, columnIndex) => (
							<th scope='col' key={columnIndex} >
								<button className="datagrid-header-button" onClick={() => handleSort(column.name)}>
									<span>{column.displayed} </span>
									{getSortIndicator(column.name)}
								</button>
							</th>
						))}
					</tr>
					{withFilter === true && <tr>
						{columns.map((column, columnIndex) => (
							<th scope='col' key={columnIndex} >
								<input type='text' className='block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									id={'filter' + columnIndex} name={'filter-' + column.name} onChange={(e) => filter(column.name, e.target.value)} />
							</th>
						))}
					</tr>}
				</thead>
				<Rows rows={rows ? rows : items} columns={columns} currentPage={currentPage} maxPerPage={maxPerPage} buttons={buttons} onCall={onCall} />
			</table>
			{items.length > maxPerPage && 
				<div className="flex justify-center space-x-2 mt-6">
					{currentPage !== 1 && <button className="px-4 py-2" onClick={() => setCurrentPage(1)}><ArrowLeftToLine size={16} /></button>}
					{currentPage > 1 && <button className="px-4 py-2" onClick={() => setCurrentPage(currentPage - 1)}><ArrowLeft size={16} /></button>}
					<div className="px-4 py-2 font-bold">Page {currentPage} of {computeCountPages(items.length)}</div>
					{currentPage < computeCountPages(items.length) && <button className="px-4 py-2 " onClick={() => setCurrentPage(currentPage + 1)}><ArrowRight size={16} /></button>}
					{currentPage !== computeCountPages(items.length) && <button className="px-4 py-2 " onClick={() => setCurrentPage(computeCountPages(items.length))}><ArrowRightToLine size={16} /></button>}
				</div>
			}
		</>
		: "")
};

function Rows({ rows, columns, currentPage, maxPerPage, onCall, buttons }) {
	return (
		<tbody className="table-group-divider">
			{rows.map((item, itemIndex) => (
				(itemIndex >= (currentPage - 1) * maxPerPage) && (itemIndex < currentPage * maxPerPage) &&
				<tr key={'row-' + itemIndex}>
					{columns.map((column, columnIndex) => (
						<td key={'row-' + itemIndex + '-' + columnIndex} >
							{(item[column.name] !== undefined && item[column.name] !== null) && '' + item[column.name]}
						</td>
					))}
					<td className="items-end">
						{buttons.map((button, buttonIndex) => (<button onClick={() => onCall(button.action, item.id)}>
							<DynamicIcon key={'row-' + itemIndex + '-b-' + buttonIndex} name={button.image} size={18} className="ml-4" />
						</button>))}
					</td>
				</tr>
			))
			}
		</tbody>
	)
}

export default Grid;