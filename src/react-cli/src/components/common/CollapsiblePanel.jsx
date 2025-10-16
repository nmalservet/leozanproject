import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function CollapsiblePanel({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full  mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-2 flex items-center justify-between  bg-primary-900 text-white  transition-all duration-300"
      >
        <span className="text-lg font-semibold">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}