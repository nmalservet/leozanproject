import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Notebook, BarChart2Icon, Settings, Users, List, FileText, CircleUser, BookText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function LeftMenuPanel() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	return (
		<div>
			<div className="bg-white">
				{/* Header Section */}
				<MenuTitle icon={<Notebook size={20} />} text="Plan" isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
				<nav className="flex-1">

					<MenuItem icon={<List size={20} />} text="Surveys" isOpen={isMenuOpen} link={"/surveys"} location={location.pathname} />
					<MenuItem icon={<CircleUser size={20} />} text="Patients" isOpen={isMenuOpen} link={"/patients"} location={location.pathname} />
					<MenuItem icon={<BookText size={20} />} text="Answers" isOpen={isMenuOpen} link={"/answers"} location={location.pathname} />
				
				</nav>

				<MenuTitle icon={<BarChart2Icon size={20} />} text="Analyze" isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
				<MenuTitle icon={<Settings size={20} />} text="Settings" isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
				<nav className="flex-1">
					<MenuItem icon={<FileText size={20} />} text="Projects" isOpen={isMenuOpen} link={"/projects"} location={location.pathname} />
					<MenuItem icon={<Users size={20} />} text="Users" isOpen={isMenuOpen} link={"/users"} location={location.pathname} />
				</nav>
			</div>
		</div>

	);
}
function MenuItem({ icon, text, isOpen, link, location }) {
	function getStyle(location) {
		if (location === link)
			return "flex items-center px-4 py-3 text-white bg-secondary-600 hover:bg-gray-700 hover:text-white transition-colors";
		else
			return "flex items-center px-4 py-3 text-secondary-500 bg-white-500 hover:bg-gray-700 hover:text-white transition-colors";
	}
	return (
		<NavLink className={getStyle(location)} key="chemq" to={link} >
			<span className="inline-flex">{icon}</span>
			{isOpen && <span className="ml-3">{text}</span>}
		</NavLink>

	);
}

function MenuTitle({ icon, text, isOpen }) {
	return (
		<div className="h-12 bg-white flex items-center justify-between px-4 border-b-4 border-primary-500">
			<h1 className={`text-primary-900 font-bold ${isOpen ? 'block' : 'hidden'}`}>
				<div className="inline-flex">
					<span className="inline-flex">{icon}</span>
					<span className="ml-3 text-base">{text}</span>
				</div></h1>
		</div>
	);
}

export default LeftMenuPanel;