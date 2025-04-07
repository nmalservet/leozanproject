import React, { useState,useEffect } from 'react';
import { Plus, CheckCircle2, Circle } from 'lucide-react';
import TaskFilter from '../components/business/TaskFilter.js';
import { CollapsiblePanel } from "../components/common/CollapsiblePanel.jsx";
import Api from '../Api.js';

/**
 * 
 * @returns display the search filter with multiple dynamic fields
 */
export default function WeekView({ projectId }) {

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const [tasks, setTasks] = useState([
		{ id: '1', title: 'Team Meeting', completed: false, day: 'Monday' },
		{ id: '2', title: 'Project Review', completed: true, day: 'Monday' },
		{ id: '3', title: 'Client Call', completed: false, day: 'Wednesday' },
		{ id: '4', title: 'Gym Session', completed: false, day: 'Thursday' },
	]);
	const [filter, setFilter] = useState({});
	const [startDate,setStartDate]=useState("20250316");//week start date
	const [endDate,setEndDate]=useState("20250321");//week end date

	function loadData(cfilter) {
		var filter = cfilter;
		filter.projectId = projectId;
		Api.getTasks(filter)
			.then((response) => {
				if (response !== undefined) {
					//we must create a new refernce for the array to be able to refresh the component
					setTasks([...response.data]);
				}
			})
			.catch((error) => {
				(console.error(error))
			});
	}
	useEffect(() => { loadData({}); }, [projectId]);

	function toggleTask(taskId) {
		setTasks(tasks.map(task =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		));
	};
	
	function applyFilter(cfilter) {
		setFilter(cfilter);
		loadData(cfilter);
	}

	function getTasksForDay(day) {
		return tasks.filter(task => task.day === day);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Task Planner</h1>

				<CollapsiblePanel title={"Filter"} children={<TaskFilter onApplyFilter={applyFilter} />} />
				{/* Week Grid */}
				<div className="grid grid-cols-1 md:grid-cols-7 gap-4">
					{days.map(day => (
						<div key={day} className="bg-white rounded-lg shadow-sm p-4">
							<h2 className="font-semibold text-gray-700 mb-4 pb-2 border-b">{day}</h2>
							<div className="space-y-3">
								{getTasksForDay(day).map(task => (
									<div
										key={task.id}
										className="flex items-start gap-2 group"
									>
										<button
											onClick={() => toggleTask(task.id)}
											className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
										>
											{task.completed ? (
												<CheckCircle2 size={18} className="text-green-500" />
											) : (
												<Circle size={18} />
											)}
										</button>
										<span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
											{task.title}
										</span>
									</div>
								))}
								{getTasksForDay(day).length === 0 && (
									<p className="text-sm text-gray-400 italic">No tasks</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}