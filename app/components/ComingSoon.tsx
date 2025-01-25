'use client';

import BackButton from './BackButton';

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <BackButton />
        
        <div className="max-w-2xl mx-auto text-center mt-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
            <svg 
              className="w-10 h-10 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {description}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Coming Soon!
            </h2>
            <p className="text-gray-600">
              We're working hard to bring you this feature. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
