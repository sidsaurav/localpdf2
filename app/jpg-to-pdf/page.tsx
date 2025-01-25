'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import BackButton from '../components/BackButton';
import PrivacyInfo from '../components/PrivacyInfo';

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length !== acceptedFiles.length) {
      setError('Only image files are allowed');
      return;
    }

    setError(null);
    setFiles(prev => [...prev, ...imageFiles]);
  }, []);

  // Generate previews when files change
  useEffect(() => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup
    return () => {
      newPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff']
    },
    multiple: true
  });

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const draggedOverItem = e.currentTarget as HTMLElement;
    draggedOverItem.style.opacity = '0.5';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const draggedOverItem = e.currentTarget as HTMLElement;
    draggedOverItem.style.opacity = '1';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedOverItem = e.currentTarget as HTMLElement;
    draggedOverItem.style.opacity = '1';

    if (draggedItem === null || draggedItem === dropIndex) return;

    // Reorder files
    const newFiles = [...files];
    const draggedFile = newFiles[draggedItem];
    newFiles.splice(draggedItem, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    setFiles(newFiles);

    setDraggedItem(null);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/jpg-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setFiles([]);
    } catch (err) {
      setError('Failed to convert images to PDF. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton />
        
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Image to PDF Converter</h1>
          <p className="mt-4 text-gray-600">Convert your images into a PDF file</p>
        </div>

        <div className="mt-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-[#1a237e] bg-[#1a237e]/10' : 'border-gray-300 hover:border-[#1a237e]'}
              ${files.length > 0 ? 'border-[#1a237e]' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-lg text-gray-600">Drag & drop your image files here</p>
                <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, GIF, BMP, WEBP, etc.</p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Images</h2>
              <p className="text-sm text-gray-600 mb-4">Drag and drop to reorder images</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className="relative group cursor-move flex flex-col items-center w-full"
                  >
                    <div className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-full">
                      <div className="aspect-[1/1.4142] relative">
                        <img
                          src={previews[index]}
                          alt={`Preview ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-contain bg-gray-50"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
                      </div>
                    </div>
                    <div className="mt-2 text-gray-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-6">
              <button
                onClick={handleConvert}
                disabled={converting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                  ${converting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#1a237e] hover:bg-[#1a237e]/90'}`}
              >
                {converting ? 'Converting...' : 'Convert to PDF'}
              </button>
            </div>
          )}

          <div className="mt-8">
            <PrivacyInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
