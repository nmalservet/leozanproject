import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB, stored inline as a base64 string

/**
 * Input to upload an image and store it as a base64 data URL in `text`.
 * Same contract as the other Input* components (name, text, onTextChange, readOnly, inline).
 */
export default function InputImage({ name, text, onTextChange, readOnly, inline }) {
	const { t } = useTranslation();
	const [error, setError] = useState('');

	function handleFile(e) {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		if (file.size > MAX_FILE_SIZE) {
			setError(t('inputImage.tooLarge'));
			e.target.value = '';
			return;
		}
		setError('');
		const reader = new FileReader();
		reader.onload = () => onTextChange(reader.result);
		reader.readAsDataURL(file);
	}

	function clear() {
		setError('');
		onTextChange('');
	}

	return (
		<div className={inline === false ? '' : 'flex'}>
			{name && <label className={'block font-black mb-1 text-sm font-bold dark:text-white min-w-24'}>{name}</label>}
			<div className="ml-5 flex flex-col gap-2">
				{readOnly !== true && <input type="file" accept="image/*" className='block p-1 border border-gray-900 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id={name} name={name} onChange={handleFile} />}
				{text && (
					<div className="flex items-center gap-2">
						<img src={text} alt={name} className="max-h-40 max-w-xs rounded border border-gray-300" />
						{readOnly !== true && <button type="button" onClick={clear}><X size={16} /></button>}
					</div>
				)}
				{error && <p className="text-red-600 text-sm">{error}</p>}
			</div>
		</div>
	);
}
