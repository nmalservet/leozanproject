/**
 * button to present the main action ( most visible)
 */

 export default function ActionButton({name,text,onClick}) {
	 
	 return (<button name={name} className="bg-primary-700 text-white hover:bg-secondary-700 text-white font-bold py-1 px-3 rounded" onClick={onClick}>{text}</button>);
	 }