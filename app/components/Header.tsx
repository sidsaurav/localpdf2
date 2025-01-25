'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ToolsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-white/80 hover:text-white flex items-center gap-1"
      >
        All Tools
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <div className="grid grid-cols-1 gap-1">
            <Link href="/compress-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Compress PDF</div>
                <div className="text-xs text-gray-500">Reduce PDF file size</div>
              </div>
            </Link>
            <Link href="/edit-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Edit PDF</div>
                <div className="text-xs text-gray-500">Modify PDF content</div>
              </div>
            </Link>
            <Link href="/split-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Split PDF</div>
                <div className="text-xs text-gray-500">Separate PDF pages</div>
              </div>
            </Link>
            <Link href="/merge-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Merge PDF</div>
                <div className="text-xs text-gray-500">Combine PDF files</div>
              </div>
            </Link>
            <Link href="/rotate-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Rotate PDF</div>
                <div className="text-xs text-gray-500">Change page orientation</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-[#1a237e] text-white">
      <div className="max-w-[1320px] mx-auto px-12 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            LocalPDF
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <ToolsDropdown />
            <Link href="/compress-pdf" className="text-white/80 hover:text-white">Compress</Link>
            <Link href="/edit-pdf" className="text-white/80 hover:text-white">Edit</Link>
            <Link href="/split-pdf" className="text-white/80 hover:text-white">Split</Link>
            <Link href="/merge-pdf" className="text-white/80 hover:text-white">Merge</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/pricing" className="text-white/80 hover:text-white">Pricing</Link>
          <Link href="/login" className="bg-white text-[#1a237e] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
