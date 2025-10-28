import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function QuillTextArea({name, text, onTextChange, readOnly,height,}) {
  //to avoid double mounting of tool for Qull ( bug) we display it according to a var
  var modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  var formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
  ];

  return (
    <div
      className={
        "w-full max-w-4xl mx-auto h-[" + (height ? height + 20 : "300") + "px]"
      }
    >
      <div className="rounded-lg overflow-hidden">
        <div className="p-1">
          <label className="block mb-2 text-sm font-medium dark:text-white ">
            <b>{name}</b>
          </label>
        </div>
        <div className="flex justify-center flex-col border-solid border-1">
          <ReactQuill
            readOnly={readOnly}
            theme="snow"
            value={text}
            onChange={onTextChange}
            modules={modules}
            formats={formats}
          ></ReactQuill>
        </div>
      </div>
    </div>
  );
}
