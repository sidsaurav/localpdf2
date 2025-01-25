'use client';

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF Toolkit
          </h1>
          <p className="text-xl text-gray-600">
            Free online PDF tools to handle all your PDF needs
          </p>
        </div>

        {/* Most Popular Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">MOST POPULAR</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/merge-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Merge PDFs</h3>
                    <p className="mt-1 text-sm text-gray-500">Combine multiple PDF files into one</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/split-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Split PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Split your PDF into multiple files</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/jpg-to-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">JPG to PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Convert images to PDF format</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Other Tools Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">OTHER TOOLS</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/pdf-to-jpg"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Coming Soon
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">PDF to JPG</h3>
                    <p className="mt-1 text-sm text-gray-500">Extract images from PDF files</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/encrypt-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Coming Soon
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Encrypt PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Secure PDF with password</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/decrypt-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Coming Soon
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Decrypt PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Remove PDF password</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/watermark-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Coming Soon
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Watermark PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Add watermarks to PDF</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/rotate-pdf"
                className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Coming Soon
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-lg">
                    <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Rotate PDF</h3>
                    <p className="mt-1 text-sm text-gray-500">Rotate PDF pages</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
