import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Paperclip, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, stored inline as a base64 string

/**
 * Input to upload an arbitrary file. Stored as a JSON string in `text`:
 * {"name":"report.pdf","type":"application/pdf","data":"data:application/pdf;base64,...."}
 * we keep the original name/type alongside the base64 data since a data URL alone loses the filename.
 */
export default function InputFile({ name, text, onTextChange, readOnly, inline }) {
	const { t } = useTranslation();
	const [error, setError] = useState('');

	let file = null;
	if (text) {
		try {
			file = JSON.parse(text);
		} catch (e) {
			file = null;
		}
	}

	function handleFile(e) {
		const f = e.target.files && e.target.files[0];
		if (!f) return;
		if (f.size > MAX_FILE_SIZE) {
			setError(t('inputFile.tooLarge'));
			e.target.value = '';
			return;
		}
		setError('');
		const reader = new FileReader();
		reader.onload = () => onTextChange(JSON.stringify({ name: f.name, type: f.type, data: reader.result }));
		reader.readAsDataURL(f);
	}

	function clear() {
		setError('');
		onTextChange('');
	}

	return (
		<div className={inline === false ? '' : 'flex'}>
			{name && <label className={'block font-black mb-1 text-sm font-bold dark:text-white min-w-24'}>{name}</label>}
			<div className="ml-5 flex flex-col gap-2">
				{readOnly !== true && <input type="file" className='block p-1 border border-gray-900 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id={name} name={name} onChange={handleFile} />}
				{file && (
					<div className="flex items-center gap-2">
						<a href={file.data} download={file.name} className="flex items-center gap-1 text-blue-700 underline">
							<Paperclip size={16} />{file.name}
						</a>
						{readOnly !== true && <button type="button" onClick={clear}><X size={16} /></button>}
					</div>
				)}
				{error && <p className="text-red-600 text-sm">{error}</p>}
			</div>
		</div>
	);
}
