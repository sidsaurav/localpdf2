import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-8 py-8 relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="grid grid-cols-10 gap-4">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#4e6af6]" />
            ))}
          </div>
        </div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            We help with your PDF tasks
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Easy, pleasant and productive PDF editor
          </p>
          <Link 
            href="/edit-pdf" 
            className="inline-flex items-center bg-[#1a237e] text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-base"
          >
            Edit a PDF document - it's free
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <p className="text-gray-500 mt-4">
            or choose one of our PDF tools below
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">MOST POPULAR</h2>
          <div className="flex justify-center max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {/* Merge PDF Card */}
              <Link 
                href="/merge-pdf"
                className="bg-gradient-to-br from-white to-purple-50 rounded-lg p-4 shadow-sm border border-purple-100 hover:shadow-md hover:-translate-y-0.5 hover:border-purple-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-purple-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Merge PDF</h3>
                <p className="text-sm text-gray-600">Combine multiple PDFs and images into one.</p>
              </Link>

              {/* Split PDF Card */}
              <Link 
                href="/split-pdf"
                className="bg-gradient-to-br from-white to-orange-50 rounded-lg p-4 shadow-sm border border-orange-100 hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-orange-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Split PDF</h3>
                <p className="text-sm text-gray-600">Split specific page ranges or extract pages.</p>
              </Link>

              {/* Compress Card */}
              <Link 
                href="/compress-pdf"
                className="bg-gradient-to-br from-white to-green-50 rounded-lg p-4 shadow-sm border border-green-100 hover:shadow-md hover:-translate-y-0.5 hover:border-green-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-green-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Compress</h3>
                <p className="text-sm text-gray-600">Reduce the size of your PDF files while maintaining quality.</p>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">OTHER TOOLS</h2>
          <div className="flex justify-center max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {/* Encrypt Card */}
              <Link 
                href="/encrypt-pdf"
                className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Encrypt PDF</h3>
                <p className="text-sm text-gray-600">Secure your PDF with password protection.</p>
              </Link>

              {/* Decrypt Card */}
              <Link 
                href="/decrypt-pdf"
                className="bg-gradient-to-br from-white to-green-50 rounded-lg p-4 shadow-sm border border-green-100 hover:shadow-md hover:-translate-y-0.5 hover:border-green-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-green-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Decrypt PDF</h3>
                <p className="text-sm text-gray-600">Remove password protection from PDF files.</p>
              </Link>

              {/* Watermark Card */}
              <Link 
                href="/watermark-pdf"
                className="bg-gradient-to-br from-white to-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-100 hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-indigo-700 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h3m-3 4h2m-8 4h2m-2-4h8" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">Watermark PDF</h3>
                <p className="text-sm text-gray-600">Add text or image watermarks to your PDF.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
