import React, { useState,memo } from "react";
import { CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
/**
 * select list component to display an select list. When the value is selected trigger an event
 * NB : using forEach on Map will not display anything, due to the JSX interpretation.
 * But it does on JS execution...
 * @param values is a Map[key,value] ( javascript map) to display. Display the value, and set the key as selected.
 * @param handleSelection is the function to provide the selection to the parent
 * @returns select list component.
 */
function SelectListMultiple({ label, values,  handleSelection,inline }) {

	const [selectedStatuses, setSelectedStatuses] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleStatus = (status) => {
		var previouses=selectedStatuses;
		var newVal = previouses.includes(status)? previouses.filter(s => s !== status): [...previouses, status];
		handleSelection(newVal);
		setSelectedStatuses(newVal);
	};

	/**
	 * display inline for the visibiliy
	 */
	function displayInlineStatuses(keys) {
		var res = "={";
		keys.forEach((key)=>{
			res+=values.get(key)+",";
		});
		res=res.slice(0, -1);
		return res+"}";
	}

	return (
		<div className={inline?'flex':''}>
		<label className={'block text-sm font-medium text-gray-900 dark:text-white'+inline?'mr-5':''}>{label}</label>
			<div className="max-w-md mx-auto w-full">
				<button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors bg-gray-50 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<span className="text-sm text-gray-400">
						{selectedStatuses.length === 0 ? 'None' : displayInlineStatuses(selectedStatuses)} 
					</span>
					{isOpen ? (<ChevronUp className="h-5 w-5" />) : (<ChevronDown className="h-5 w-5" />)}
				</button>
				
				<div className={'rounded-lg border border-gray-300 space-y-1 transition-all duration-300 ease-in-out ' + (isOpen ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden')}>
					{(() => {
						let options = [];
						values.forEach((value, key) => {
							options.push(<button key={key} onClick={() => toggleStatus(key)} className={'w-full flex items-center justify-between p-1 rounded-md transition-colors ' + (selectedStatuses.includes(key) ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700')}>
								<span className="text-sm font-medium">{value}</span>
								{selectedStatuses.includes(key) ? (<CheckSquare className="h-5 w-5" />) : (<Square className="h-5 w-5" />)}
							</button>)
						})
						return options;
					})()}
				</div>
			</div>
		</div>
	);
}
//we use memo to only render if if the props are changed
export default memo(SelectListMultiple);