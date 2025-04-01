/**
 * Input test with label
 */
export default function InputText({ name, text, onTextChange, readOnly,inline }) {
	return (
		<div className={inline?'flex':''}>
			{name&&<label className={'block mb-1 text-sm font-medium text-gray-900 dark:text-white'+inline?'mr-5':''}>{name}</label>}
			<input type='text' className='block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id={name} name={name} readOnly={readOnly} value={text} onChange={(e) => onTextChange(e.target.value)} />
		</div>
	);
}