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
          className="absolute top-full left-0 mt-1 w-[500px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <div className="grid grid-cols-2 gap-1">
            <Link href="/merge-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Merge PDFs</div>
                <div className="text-xs text-gray-500">Combine multiple PDF files</div>
              </div>
            </Link>
            <Link href="/split-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Split PDF</div>
                <div className="text-xs text-gray-500">Split your PDF into multiple files</div>
              </div>
            </Link>
            <Link href="/jpg-to-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">JPG to PDF</div>
                <div className="text-xs text-gray-500">Convert JPG images to PDF</div>
              </div>
            </Link>
            <Link href="/pdf-to-jpg" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">PDF to JPG</div>
                <div className="text-xs text-gray-500">Convert PDF to JPG images</div>
              </div>
            </Link>
            <Link href="/encrypt-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Encrypt PDF</div>
                <div className="text-xs text-gray-500">Secure PDF with password</div>
              </div>
            </Link>
            <Link href="/decrypt-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Decrypt PDF</div>
                <div className="text-xs text-gray-500">Remove PDF password</div>
              </div>
            </Link>
            <Link href="/watermark-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Watermark PDF</div>
                <div className="text-xs text-gray-500">Add watermarks to PDF</div>
              </div>
            </Link>
            <Link href="/rotate-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium whitespace-nowrap">Rotate PDF</div>
                <div className="text-xs text-gray-500">Rotate PDF pages</div>
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
            <Link href="/merge-pdf" className="text-white/80 hover:text-white">Merge</Link>
            <Link href="/split-pdf" className="text-white/80 hover:text-white">Split</Link>
            <Link href="/jpg-to-pdf" className="text-white/80 hover:text-white">JPG to PDF</Link>
            <Link href="/pdf-to-jpg" className="text-white/80 hover:text-white">PDF to JPG</Link>
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
