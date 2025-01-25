'use client';

import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function RotatePdf() {
  return (
    <ComingSoon
      title="Rotate PDF"
      description="Rotate pages in your PDF files to any angle"
      icon={
        <svg className="w-16 h-16 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      }
    />
  );
}
