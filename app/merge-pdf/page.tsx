'use client';

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import * as pdfjsLib from 'pdfjs-dist';
import Image from 'next/image';
import BackButton from '../components/BackButton';
import PrivacyInfo from '../components/PrivacyInfo';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'original' | 'name_asc' | 'name_desc'>('original');

  const generateThumbnail = async (file: File): Promise<string> => {
    try {
      // Load the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      // Get the first page
      const page = await pdf.getPage(1);
      
      // Set the desired dimensions
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      
      // Scale to fit within 400px width while maintaining aspect ratio
      const desiredWidth = 400;
      const scale = desiredWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });
      
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      
      // Render the page
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;
      
      // Convert to image URL
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      return thumbnailUrl;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return '';
    }
  };

  useEffect(() => {
    // Generate thumbnails for new files
    const generateThumbnails = async () => {
      const newThumbnails = await Promise.all(
        files.map(generateThumbnail)
      );
      setThumbnails(newThumbnails);
    };

    if (files.length > 0) {
      generateThumbnails();
    }

    // Cleanup old thumbnails
    return () => {
      thumbnails.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [files]);

  const sortedFileIndices = useMemo(() => {
    const indices = Array.from({ length: files.length }, (_, i) => i);
    
    switch (sortBy) {
      case 'name_asc':
        indices.sort((a, b) => files[a].name.localeCompare(files[b].name));
        break;
      case 'name_desc':
        indices.sort((a, b) => files[b].name.localeCompare(files[a].name));
        break;
      default:
        // original order
        break;
    }
    
    return indices;
  }, [files, sortBy]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles.filter(file => file.type === 'application/pdf')]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setThumbnails(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    // Reorder files
    const newFiles = [...files];
    const newThumbnails = [...thumbnails];
    const draggedFile = newFiles[draggedItem];
    const draggedThumbnail = newThumbnails[draggedItem];

    newFiles.splice(draggedItem, 1);
    newFiles.splice(index, 0, draggedFile);
    newThumbnails.splice(draggedItem, 1);
    newThumbnails.splice(index, 0, draggedThumbnail);

    setFiles(newFiles);
    setThumbnails(newThumbnails);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge')
      return
    }

    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })

    try {
      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to merge PDFs')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'merged.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('Failed to merge PDFs. Please try again.')
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Merge PDF Files
          </h1>
          <p className="text-lg text-gray-600">
            Combine multiple PDFs into a single file
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center">
            {files.length === 0 ? (
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
                        ? 'Drop the PDF files here'
                        : 'Drag & drop PDF files here, or click to select files'}
                    </p>
                    <p className="text-sm text-gray-500">Only PDF files are accepted</p>
                  </div>
                </div>
                <PrivacyInfo />
              </>
            ) : (
              <div className="mt-8 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Selected Files:</h3>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white text-gray-700 hover:border-[#1a237e] focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e] outline-none transition-colors"
                    >
                      <option value="original">Original Order</option>
                      <option value="name_asc">Name (A to Z)</option>
                      <option value="name_desc">Name (Z to A)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8 rounded-lg">
                  {sortedFileIndices.map((fileIndex) => {
                    const file = files[fileIndex];
                    const thumbnail = thumbnails[fileIndex];
                    return (
                      <div
                        key={fileIndex}
                        draggable
                        onDragStart={(e) => handleDragStart(e, fileIndex)}
                        onDragOver={(e) => handleDragOver(e, fileIndex)}
                        onDragEnd={handleDragEnd}
                        className={`flex flex-col bg-white rounded-lg ${
                          draggedItem === fileIndex ? 'ring-2 ring-[#1a237e] shadow-lg' : 'shadow hover:shadow-lg'
                        } cursor-move transition-all relative group h-full`}
                      >
                        {/* PDF Thumbnail */}
                        <div className="w-full aspect-[3/4] bg-white relative rounded-t-lg p-2">
                          {thumbnail ? (
                            <div className="w-full h-full relative">
                              <Image
                                src={thumbnail}
                                alt={file.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                priority={fileIndex < 4}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => removeFile(fileIndex)}
                              className="p-1 bg-white/90 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm"
                              title="Remove PDF"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* File Info */}
                        <div className="p-3 border-t bg-white rounded-b-lg">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name.replace(/\.[^/.]+$/, '')}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleMerge}
                  className="mt-8 w-full bg-[#1a237e] text-white py-3 px-6 rounded-lg hover:bg-[#1a237e]/90 transition-colors font-semibold"
                >
                  Merge PDFs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
