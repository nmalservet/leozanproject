import React, { useState } from "react";
import InputText from '../common/InputText.js';
import ComparatorSelectList from './ComparatorSelectList.js';
import StatusSelectListMultiple from './StatusSelectListMultiple.js';
import PrioritiesSelectListMultiple from './PrioritiesSelectListMultiple.js';
import InputDate from '../common/InputDate.js';
import UsersSelectList from './UsersSelectList.js';
import ActionButton from '../common/ActionButton.js';
import SecondaryActionButton from '../common/SecondaryActionButton.js';

/**
 * filter to be apply on patients
 */
function PatientFilter({ onApplyFilter }) {
	//we set the messages to an empty array if clicked.
	const [id, setId] = useState(null);
	const [topic, setTopic] = useState(null);
	const [description, setDescription] = useState(null);
	const [statuses, setStatuses] = useState([]);
	const [priorities, setPriorities] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [estimated, setEstimated] = useState(null);
	const [progress, setProgress] = useState(null);
	const [responsible, setResponsible] = useState(null);
	const [comparatorEstimated, setComparatorEstimated] = useState(null);
	const [comparatorProgress, setComparatorProgress] = useState(null);
	const [comparatorStartDate, setComparatorSartDate] = useState(null);
	const [comparatorEndDate, setComparatorEndDate] = useState(null);

	/* on search click set the filter to the parent.*/
	function search() {
		var filter = {};
		if (id != null)
			filter.id = id;
		if (topic&&topic.length>0)
			filter.name = topic;
		if (description&&description.length>0)
			filter.description = description;
		if (statuses != null) {
			//var statuses = [];
			//statuses.push(status);
			filter.status = statuses;//this is a list.
		}
		//priority is a list also
		if (priorities != null) {
			filter.priority = priorities;
		}
		//estimated
		if (comparatorEstimated != null)
			filter.comparatorEstimated = comparatorEstimated;
		if (estimated != null)
			filter.estimated = estimated;
		//progress
		if (comparatorProgress != null)
			filter.comparatorProgress = comparatorProgress;
		if (progress != null)
			filter.progress = progress;
		if (responsible != null)
			filter.responsibleId = responsible;
		//start date
		if (comparatorStartDate != null)
			filter.comparatorStartDate = comparatorStartDate;
		filter.startDate = startDate
		//end date
		if (comparatorEndDate != null)
			filter.comparatorEndDate = comparatorEndDate;
		filter.endDate = endDate
		onApplyFilter(filter);
	}
	
	/**
	 * reset all fields values
	 */
	function reset(){
		setId('');
		setTopic('');
		setStatuses([]);
		setPriorities([]);
		setResponsible(null);
		setDescription('');
		setComparatorEstimated(null);
		setEstimated('');
		setComparatorProgress(null);
		setProgress('');
		setComparatorSartDate(null);
		setStartDate(null);
		setComparatorEndDate(null);
		setEndDate(null);
	}

	return (
		<div className="h-40 overflow-y-auto">
			<div className="grid grid-cols-4 content-start gap-4 ">
				<InputText name={"Id"} text={id} onTextChange={setId} inline={true}></InputText>
				<InputText name={"Topic"} text={topic} onTextChange={setTopic} inline={true}></InputText>
				<UsersSelectList label={"Responsible"} selected={responsible} onSelection={setResponsible} inline={true}/>
				<InputText name={"Description"} text={""} onTextChange={setDescription} inline={true}></InputText>
				
				
				<StatusSelectListMultiple onSelection={setStatuses} inline={true}/>
				
				<PrioritiesSelectListMultiple onSelection={setPriorities} inline={true}/>
				<div className="flex">
					<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mr-5">Estimation</label>
					<div className="flex">
						<div className=""><ComparatorSelectList onSelection={setComparatorEstimated} /></div>
						<div className="ml-3"><InputText text={""} onTextChange={setEstimated} /></div>
					</div>
				</div>
				<div className="flex">
					<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mr-5">Progress</label>
					<div className="flex">
						<div className=""><ComparatorSelectList onSelection={setComparatorProgress} /></div>
						<div className="ml-3 w-full"><InputText name={""} text={""} onTextChange={setProgress} /></div>
					</div>
				</div>
				<div className="flex">
					<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
					<div className="flex">
						<div className="ml-3 mr-3"><ComparatorSelectList onSelection={setComparatorSartDate} /></div>
						<div className="ml-3"><InputDate text={startDate} onTextChange={setStartDate}></InputDate></div>
					</div>
				</div>
				<div className="flex">
					<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
					<div className="flex">
						<div className="ml-3 mr-3"><ComparatorSelectList onSelection={setComparatorEndDate} /></div>
						<div className="ml-3 w-full"><InputDate  text={endDate} onTextChange={setEndDate}></InputDate></div>
					</div>
				</div>
			</div>
			<div className="flex  m-2 items-center">
				<SecondaryActionButton text={"Reset filter"} onClick={() => reset()}/>
				<div className="ml-10">
				<ActionButton text={"Search"} onClick={() => search()}/>
				</div>
			</div>
		</div>
	)
}

export default PatientFilter;