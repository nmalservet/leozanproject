import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link', 'image'
];

export default function QuillTextArea({name,text,onTextChange,readOnly}) {

	const modules = (readOnly===false)?{
	  toolbar: [
	    [{ header: [1, 2, 3, false] }],
	    ['bold', 'italic', 'underline', 'strike'],
	    [{ list: 'ordered' }, { list: 'bullet' }],
	    [{ color: [] }, { background: [] }],
	    ['link', 'image'],
	    ['clean']
	  ]
	}:{toolbar:false};
	
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden">
        <div className="p-1"><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name}</label></div>
        <div className="p-1">
          <ReactQuill
          	readOnly={readOnly}
            theme="snow"
            value={text}
            onChange={onTextChange}
			modules={modules}
            formats={formats}
            className="h-[100px]"
			toolbar="false"
          />
        </div>
      </div>
    </div>
  );
}