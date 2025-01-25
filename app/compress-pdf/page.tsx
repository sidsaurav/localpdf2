'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium')

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
    maxFiles: 1
  })

  const handleCompress = async () => {
    if (!file) {
      alert('Please select a PDF file to compress')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('compressionLevel', compressionLevel)

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
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Header */}
      <header className="bg-[#4e6af6] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              LocalPDF
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="text-white/90 hover:text-white">Pricing</Link>
            <Link href="/login" className="bg-white text-[#4e6af6] px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Compress PDF file</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Reduce file size while optimizing for maximal PDF quality.
          </p>

          <div className="flex items-center justify-center text-green-600 mb-8">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Private: Your files never leave your device</span>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-[#4e6af6] bg-[#4e6af6]/5' : 'border-gray-300 hover:border-[#4e6af6]'}`}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 bg-[#4e6af6]/10 rounded-2xl mb-6 mx-auto flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#4e6af6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg mb-2 text-gray-800">
              {isDragActive
                ? 'Drop the PDF file here'
                : 'Drag & drop a PDF file here, or click to select file'}
            </p>
            <p className="text-sm text-gray-500">Only PDF files are accepted</p>
          </div>

          {file && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Selected File: {file.name}</h3>
              
              <div className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Compression Level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className={`p-4 text-center rounded-lg border transition-colors ${
                        compressionLevel === 'low'
                          ? 'bg-[#4e6af6] text-white border-[#4e6af6]'
                          : 'border-gray-300 text-gray-700 hover:border-[#4e6af6]'
                      }`}
                      onClick={() => setCompressionLevel('low')}
                    >
                      Low
                    </button>
                    <button
                      className={`p-4 text-center rounded-lg border transition-colors ${
                        compressionLevel === 'medium'
                          ? 'bg-[#4e6af6] text-white border-[#4e6af6]'
                          : 'border-gray-300 text-gray-700 hover:border-[#4e6af6]'
                      }`}
                      onClick={() => setCompressionLevel('medium')}
                    >
                      Medium
                    </button>
                    <button
                      className={`p-4 text-center rounded-lg border transition-colors ${
                        compressionLevel === 'high'
                          ? 'bg-[#4e6af6] text-white border-[#4e6af6]'
                          : 'border-gray-300 text-gray-700 hover:border-[#4e6af6]'
                      }`}
                      onClick={() => setCompressionLevel('high')}
                    >
                      High
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCompress}
                  className="w-full bg-[#4e6af6] text-white py-3 px-6 rounded-lg hover:bg-[#4e6af6]/90 transition-colors"
                >
                  Compress PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
