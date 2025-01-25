import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Currently in Beta - All features are free!
          </p>
        </div>

        {/* Beta Banner */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-[#1a237e] to-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid grid-cols-3 items-center">
              <div className="col-span-2">
                <h3 className="text-2xl leading-6 font-semibold text-white">Beta Access</h3>
                <div className="mt-4 text-white text-opacity-80">
                  <p>Get early access to all premium features</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-white">
                  Free
                </div>
                <div className="mt-2 text-white text-opacity-80">
                  Limited time
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pt-6 pb-8 bg-[#1a237e] bg-opacity-80 sm:px-10 sm:py-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">Unlimited PDF Merging</span>
              </li>
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">PDF Splitting</span>
              </li>
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">Image to PDF Conversion</span>
              </li>
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">No File Size Limits</span>
              </li>
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">Upcoming Premium Features</span>
              </li>
              <li className="flex items-center text-white">
                <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3">Priority Support</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/"
                className="block w-full bg-white rounded-lg py-3 text-center font-medium text-[#1a237e] hover:bg-gray-100 transition-colors"
              >
                Start Using Now - It&apos;s Free!
              </Link>
            </div>
          </div>
        </div>

        {/* Future Plans Notice */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Future Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            We&apos;re working hard to bring you more features. After the beta period, we&apos;ll introduce flexible pricing plans to suit different needs while maintaining a generous free tier.
          </p>
          <div className="mt-8 inline-flex items-center space-x-2 text-[#1a237e]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Beta users will receive special discounts on future premium plans</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">How long will the beta period last?</h3>
              <p className="mt-2 text-gray-500">The beta period will continue while we add more features and gather user feedback. All users who sign up during beta will be notified before any pricing changes.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Are there any usage limits during beta?</h3>
              <p className="mt-2 text-gray-500">During the beta period, you can use all available features without any restrictions. We only ask for fair usage to ensure everyone can benefit from the service.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Will my files be secure?</h3>
              <p className="mt-2 text-gray-500">Yes! We process all files locally in your browser. Your files never leave your device, ensuring maximum privacy and security.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
