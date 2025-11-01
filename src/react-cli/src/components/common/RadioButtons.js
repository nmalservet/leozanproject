import React, { useState } from "react";
import { memo } from "react";
/**
 * select list component to display an select list. When the value is selected trigger an event
 * NB : using forEach on Map will not display anything, due to the JSX interpretation.
 * But it does on JS execution...
 * @param values is a Map[key,value] ( javascript map) to display. Display the value, and set the key as selected.
 * @param handleSelection is the function to provide the selection to the parent
 * @param selected the defaultSelection
 * @returns select list component.
 */
function RadioButtons({ label,selected, values, handleSelection, inline }) {

	/**
	 * we hide the first item if a selection has been already done
	 * @param {*} val 
	 */
	function handleChange(key) {
		handleSelection(key);
	}


	return (
		<div className={inline == false ? '' : 'flex'}>
			<fieldset>
				{label && label.length > 0 && <legend><label className={'block font-black mb-1 text-sm font-bold dark:text-white min-w-24'}>{label}:</label></legend>}


				{(() => {
					let options = [];
					values.forEach((value, key) => {
						options.push(
							<div>
								{value}:{selected}
								<input type="radio" id={value} name={label} value={value} checked={selected === value} onChange={handleChange}/>
								<label for={value} className="ml-3"> {value}</label>
							</div>)
					})
					return options;
				})()}
				{(values === undefined || values === null || values.size === 0) && <div className="col-7"><span >{values}Aucune valeur</span></div>}
			</fieldset>
		</div>
	);
}
//we use memo to only render if if the props are changed
export default memo(RadioButtons);