import React from 'react'

const CodeEditor = ({ 
  value, 
  onChange, 
  language = 'javascript',
  placeholder = 'Enter your code here...',
  className = '',
  height = '400px',
  ...props 
}) => {
  return (
    <div className={`relative border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {language}
        </span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full p-4 font-mono text-sm bg-white resize-none focus:outline-none code-editor"
        style={{ height }}
        spellCheck="false"
        {...props}
      />
    </div>
  )
}

export default CodeEditor