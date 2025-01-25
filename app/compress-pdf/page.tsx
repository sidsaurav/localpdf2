'use client';

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import BackButton from '../components/BackButton'
import PrivacyInfo from '../components/PrivacyInfo'

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const handleCompress = async () => {
    if (!file) return

    setCompressing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/compress-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to compress PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'compressed.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error compressing PDF:', error)
      alert('Failed to compress PDF. Please try again.')
    } finally {
      setCompressing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Compress PDF File</h1>
          <p className="text-lg text-gray-600">
            Reduce file size while optimizing for maximal PDF quality
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center">
            {!file ? (
              <>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors w-full
                    ${isDragActive ? 'border-[#1a237e] bg-[#1a237e]/10' : 'border-gray-300 hover:border-[#1a237e]'}`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#1a237e] mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg mb-2 text-gray-800">
                      {isDragActive
                        ? 'Drop the PDF file here'
                        : 'Drag & drop PDF file here, or click to select file'}
                    </p>
                    <p className="text-sm text-gray-500">Only PDF files are accepted</p>
                  </div>
                </div>
                <PrivacyInfo />
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#1a237e]/10 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#1a237e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleCompress}
                  disabled={compressing}
                  className="w-full bg-[#1a237e] text-white py-3 px-6 rounded-lg hover:bg-[#1a237e]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {compressing ? 'Compressing...' : 'Compress PDF'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
