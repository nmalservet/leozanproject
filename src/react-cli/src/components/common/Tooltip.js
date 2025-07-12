import React from "react";
import { MessageCircleQuestion } from 'lucide-react';
/**
 * button to present the main action ( most visible)
 */

export default function Tooltip({ name, content }) {


	return (<div className="relative inline-block group">
		<div className="text-blue-500"><button name={name} className="font-bold py-1 px-3 rounded" ><MessageCircleQuestion size={18} color={"orange"} /></button>
		</div>
		<div className="absolute z-10 hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 leading-none t whitespace-no-wrap rounded shadow-lg text-sm font-medium rounded-lg border bg-blue-100">{content}</div>
	</div>)
}