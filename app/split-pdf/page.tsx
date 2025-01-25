'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import * as pdfjsLib from 'pdfjs-dist';
import Image from 'next/image';
import BackButton from '../components/BackButton';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PageRange {
  id: string;
  start: number;
  end: number;
  thumbnail?: string;
}

const loadPdfThumbnail = async (pdfFile: File, pageNumber: number): Promise<string> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const page = await pdf.getPage(pageNumber);
    
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    
    const desiredWidth = 400;
    const scale = desiredWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });
    
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;
    
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return '';
  }
};

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
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <div className="grid grid-cols-1 gap-1">
            <Link href="/compress-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Compress PDF</div>
                <div className="text-xs text-gray-500">Reduce PDF file size</div>
              </div>
            </Link>
            <Link href="/edit-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Edit PDF</div>
                <div className="text-xs text-gray-500">Modify PDF content</div>
              </div>
            </Link>
            <Link href="/split-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Split PDF</div>
                <div className="text-xs text-gray-500">Separate PDF pages</div>
              </div>
            </Link>
            <Link href="/merge-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Merge PDF</div>
                <div className="text-xs text-gray-500">Combine PDF files</div>
              </div>
            </Link>
            <Link href="/rotate-pdf" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <div className="text-gray-900 font-medium">Rotate PDF</div>
                <div className="text-xs text-gray-500">Change page orientation</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRanges, setPageRanges] = useState<PageRange[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [splitMode, setSplitMode] = useState<'custom' | 'fixed'>('custom');
  const [mergeInOne, setMergeInOne] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles[0];
    if (pdfFile?.type !== 'application/pdf') return;

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const pages = pdf.numPages;
      
      setFile(pdfFile);
      setTotalPages(pages);
      
      // Create initial page range for all pages
      const initialRange: PageRange = {
        id: '1',
        start: 1,
        end: pages,
      };
      setPageRanges([initialRange]);

      // Generate thumbnail for first page
      const firstPageThumb = await loadPdfThumbnail(pdfFile, 1);
      setThumbnails([firstPageThumb]);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }, []);

  const addPageRange = () => {
    if (!file || pageRanges.length >= totalPages) return;

    const lastRange = pageRanges[pageRanges.length - 1];
    const nextStart = lastRange.end + 1;
    
    if (nextStart <= totalPages) {
      const newRange: PageRange = {
        id: Date.now().toString(),
        start: nextStart,
        end: totalPages,
      };
      
      // Adjust the previous range's end
      const updatedRanges = pageRanges.map(range => 
        range.id === lastRange.id 
          ? { ...range, end: nextStart - 1 }
          : range
      );
      
      setPageRanges([...updatedRanges, newRange]);
      
      // Generate thumbnail for the new range
      loadPdfThumbnail(file, nextStart).then(thumb => {
        setThumbnails(prev => [...prev, thumb]);
      });
    }
  };

  const removePageRange = (id: string) => {
    if (pageRanges.length <= 1) return;

    const rangeIndex = pageRanges.findIndex(r => r.id === id);
    if (rangeIndex === -1) return;

    const range = pageRanges[rangeIndex];
    const nextRange = pageRanges[rangeIndex + 1];
    const prevRange = pageRanges[rangeIndex - 1];

    let updatedRanges = pageRanges.filter(r => r.id !== id);

    // Adjust adjacent ranges
    if (nextRange) {
      updatedRanges = updatedRanges.map(r =>
        r.id === nextRange.id ? { ...r, start: range.start } : r
      );
    } else if (prevRange) {
      updatedRanges = updatedRanges.map(r =>
        r.id === prevRange.id ? { ...r, end: range.end } : r
      );
    }

    setPageRanges(updatedRanges);
    setThumbnails(prev => prev.filter((_, i) => i !== rangeIndex * 2 && i !== rangeIndex * 2 + 1));
  };

  const updatePageRange = (id: string, start: number | string, end: number | string) => {
    const rangeIndex = pageRanges.findIndex(r => r.id === id);
    if (rangeIndex === -1) return;

    const parsedStart = start === '' ? 1 : Math.max(1, parseInt(start.toString()));
    const parsedEnd = end === '' ? totalPages : Math.min(totalPages, parseInt(end.toString()));

    const updatedRanges = [...pageRanges];
    updatedRanges[rangeIndex] = {
      ...pageRanges[rangeIndex],
      start: parsedStart,
      end: parsedEnd
    };

    // Validate ranges
    if (!isNaN(parsedStart) && !isNaN(parsedEnd) && parsedStart <= parsedEnd) {
      setPageRanges(updatedRanges);

      // Update thumbnail if start page changed
      if (parsedStart !== pageRanges[rangeIndex].start) {
        loadPdfThumbnail(file, parsedStart).then(thumb => {
          setThumbnails(prev => prev.map((t, i) => i === rangeIndex * 2 ? thumb : t));
        });
      }

      if (parsedEnd !== pageRanges[rangeIndex].end) {
        loadPdfThumbnail(file, parsedEnd).then(thumb => {
          setThumbnails(prev => prev.map((t, i) => i === rangeIndex * 2 + 1 ? thumb : t));
        });
      }
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('splitMethod', 'range');
      formData.append('mergeInOne', mergeInOne.toString());
      
      // Convert page ranges to string format
      const rangeString = pageRanges
        .map(range => `${range.start}-${range.end}`)
        .join(',');
      formData.append('pageRange', rangeString);

      // Send request to API
      const response = await fetch('/api/split-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to split PDF');
      }

      // Get the file (either ZIP or PDF)
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Set appropriate filename based on mergeInOne option
      if (mergeInOne) {
        a.download = file.name.replace('.pdf', '_merged.pdf');
      } else {
        a.download = file.name.replace('.pdf', '_split.zip');
      }
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  useEffect(() => {
    const loadThumbnails = async () => {
      if (!file) return;

      const thumbnailPromises = pageRanges.flatMap(range => {
        const promises = [loadPdfThumbnail(file, range.start)];
        if (range.start !== range.end) {
          promises.push(loadPdfThumbnail(file, range.end));
        }
        return promises;
      });

      try {
        const newThumbnails = await Promise.all(thumbnailPromises);
        setThumbnails(newThumbnails);
      } catch (error) {
        console.error('Error loading thumbnails:', error);
      }
    };

    loadThumbnails();
  }, [file, pageRanges]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF File</h1>
          <p className="text-gray-600">Separate one PDF into multiple PDFs</p>
        </div>

        {/* Upload Section */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center">
            {!file ? (
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
            ) : (
              <div className="flex flex-col md:flex-row gap-8 w-full">
                {/* Left side - PDF Preview */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 bg-gray-50">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">PDF Preview</h3>
                    <span className="text-sm text-gray-500">{totalPages} pages</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {pageRanges.map((range, index) => (
                      <div key={range.id} className="space-y-2 border-2 border-dotted border-gray-300 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-700">Range {index + 1}</div>
                        <div className="flex gap-2">
                          <div className="flex-1 relative aspect-[3/4] bg-white rounded-lg overflow-hidden">
                            {thumbnails[index * 2] && (
                              <Image
                                src={thumbnails[index * 2]}
                                alt={`Page ${range.start}`}
                                fill
                                className="object-contain"
                                priority={index === 0}
                              />
                            )}
                            <span className="absolute bottom-2 left-2 text-xs text-gray-500">{range.start}</span>
                          </div>
                          {range.start !== range.end && (
                            <div className="flex-1 relative aspect-[3/4] bg-white rounded-lg overflow-hidden">
                              {thumbnails[index * 2 + 1] && (
                                <Image
                                  src={thumbnails[index * 2 + 1]}
                                  alt={`Page ${range.end}`}
                                  fill
                                  className="object-contain"
                                  priority={index === 0}
                                />
                              )}
                              <span className="absolute bottom-2 left-2 text-xs text-gray-500">{range.end}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {totalPages} pages
                    </p>
                  </div>
                </div>

                {/* Right side - Split Options */}
                <div className="md:w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-gray-900">Split</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-gray-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs text-gray-600">Range</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-gray-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-xs text-gray-400">Pages</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-gray-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span className="text-xs text-gray-400">Size</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Range mode:</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSplitMode('custom')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
                          ${splitMode === 'custom' 
                            ? 'bg-[#1a237e]/10 text-[#1a237e] ring-1 ring-[#1a237e]' 
                            : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        Custom ranges
                      </button>
                      <button
                        onClick={() => setSplitMode('fixed')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
                          ${splitMode === 'fixed' 
                            ? 'bg-[#1a237e]/10 text-[#1a237e] ring-1 ring-[#1a237e]' 
                            : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        Fixed ranges
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {pageRanges.map((range, index) => (
                      <div key={range.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Range {index + 1}</span>
                          {pageRanges.length > 1 && (
                            <button
                              onClick={() => removePageRange(range.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-900 mb-1">from page</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={range.start}
                                onChange={(e) => updatePageRange(range.id, e.target.value, range.end)}
                                min={1}
                                max={range.end}
                                className="w-full pl-3 pr-8 py-2 border rounded-lg text-sm text-gray-900 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <button 
                                  className="p-1 hover:text-[#1a237e] text-gray-700" 
                                  onClick={() => {
                                    const newValue = Math.min(range.start + 1, range.end);
                                    updatePageRange(range.id, newValue, range.end);
                                  }}
                                  disabled={range.start >= range.end}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </button>
                                <button 
                                  className="p-1 hover:text-[#1a237e] text-gray-700" 
                                  onClick={() => {
                                    const newValue = Math.max(range.start - 1, 1);
                                    updatePageRange(range.id, newValue, range.end);
                                  }}
                                  disabled={range.start <= 1}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center pt-6">
                            <span className="text-gray-900 font-medium">to</span>
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-900 mb-1">page</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={range.end}
                                onChange={(e) => updatePageRange(range.id, range.start, e.target.value)}
                                min={range.start}
                                max={totalPages}
                                className="w-full pl-3 pr-8 py-2 border rounded-lg text-sm text-gray-900 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <button 
                                  className="p-1 hover:text-[#1a237e] text-gray-700" 
                                  onClick={() => {
                                    const newValue = Math.min(range.end + 1, totalPages);
                                    updatePageRange(range.id, range.start, newValue);
                                  }}
                                  disabled={range.end >= totalPages}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </button>
                                <button 
                                  className="p-1 hover:text-[#1a237e] text-gray-700" 
                                  onClick={() => {
                                    const newValue = Math.max(range.end - 1, range.start);
                                    updatePageRange(range.id, range.start, newValue);
                                  }}
                                  disabled={range.end <= range.start}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addPageRange}
                      disabled={pageRanges.length >= totalPages}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium text-[#1a237e] hover:bg-[#1a237e]/10 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Range
                    </button>

                    <label className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        checked={mergeInOne}
                        onChange={(e) => setMergeInOne(e.target.checked)}
                        className="rounded border-gray-300 text-[#1a237e] focus:ring-[#1a237e]"
                      />
                      <span className="text-sm text-gray-600">Merge all ranges in one PDF file</span>
                    </label>
                  </div>

                  <button
                    onClick={handleSplit}
                    disabled={isLoading}
                    className="mt-6 w-full bg-[#1a237e] text-white py-3 px-6 rounded-lg hover:bg-[#1a237e]/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Splitting PDF...</span>
                      </>
                    ) : (
                      <>
                        <span>Split PDF</span>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Info Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Files stay private. Automatically deleted after 2 hours.</p>
              <p className="text-sm text-gray-500 mt-1">Free service for documents up to 50 pages or 50 MB and 3 tasks per hour.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
