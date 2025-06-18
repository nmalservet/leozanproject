import React, {  useState } from "react";
import {MessageCircleQuestion} from 'lucide-react';
/**
 * button to present the main action ( most visible)
 */

 export default function Tooltip({name,content}) {
	const [showContent,setShowContent] =useState(false);
	
	function onClick(){
		setShowContent(!showContent);
	}
	
	function hide(){
		setShowContent(false);
	}
	 
	 return (<div>
		<button name={name} className="font-bold py-1 px-3 rounded" onClick={onClick}><MessageCircleQuestion size={18} color={!showContent?"orange":"green"}/></button>
		{showContent&&<div role="tooltip" className="text-sm font-medium rounded-lg border bg-blue-100">
			<div className="m-1 ">{content} </div></div>}
		</div>);
	 }