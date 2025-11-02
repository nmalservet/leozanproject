/**
 * Input test with label
 */

 export default function InputText({name,value,onValueChange,readOnly}) {
	 
	 return (
		 <div className="flex" >
            	<label  className="block mb-1 mr-5 text-sm font-medium text-gray-900 dark:text-white"><b>{name}</b></label>
                <input disabled={readOnly===true}  type="checkbox"  className='block border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id={name}  name={name} readOnly={readOnly} defaultValue={value}defaultChecked={value}  onChange={(e) => onValueChange(e.target.checked)} />
            </div>
	 );
	 }