'use client';

import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function PdfToJpg() {
  return (
    <ComingSoon
      title="PDF to JPG Converter"
      description="Convert your PDF files into high-quality JPG images"
      icon={
        <svg className="w-16 h-16 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z M4 16l4 4m0 0l4-4m-4 4V4" />
        </svg>
      }
    />
  );
}
