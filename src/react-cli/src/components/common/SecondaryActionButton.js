/**
 * button to present the main action ( most visible)
 */

 export default function SecondaryActionButton({name,text,onClick}) {
	 
	 return (<button name={name} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded" onClick={onClick}>{text}</button>
	 );
	 }