/**
 * Input type file with label
 */
export default function InputFile({ name, text, onTextChange, readOnly,inline }) {
	return (
		<div className={inline===false?'':'flex'}>
			{name&&<label className={'block font-black mb-1 text-sm font-bold dark:text-white min-w-24'}>{name}</label>}
			<input type='file' className='ml-5 block  p-1 border border-gray-900 rounded-lg  text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id={name} name={name} readOnly={readOnly} value={text} onChange={(e) => onTextChange(e.target.value)} />
		</div>
	);
}