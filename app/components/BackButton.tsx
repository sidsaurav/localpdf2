'use client';

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link 
      href="/"
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
    >
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-gray-200 transition-colors">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </div>
      Home
    </Link>
  );
}
