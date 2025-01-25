import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('images') as File[];

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Process each image
    for (const image of images) {
      // Convert image to buffer
      const buffer = Buffer.from(await image.arrayBuffer());

      // Get image dimensions using sharp
      const metadata = await sharp(buffer).metadata();
      const { width = 595, height = 842 } = metadata; // Default to A4 size if metadata is unavailable

      // Convert any image format to PNG using sharp
      const pngBuffer = await sharp(buffer)
        .rotate() // Auto-rotate based on EXIF data
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
        })
        .png()
        .toBuffer();

      // Embed the PNG image
      const pngImage = await pdfDoc.embedPng(pngBuffer);
      
      // Calculate dimensions to fit on PDF page while maintaining aspect ratio
      const pageWidth = width;
      const pageHeight = height;
      
      // Add a new page with the calculated dimensions
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      
      // Draw the image on the page
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=converted.pdf',
      },
    });
  } catch (error) {
    console.error('Error converting images to PDF:', error);
    return NextResponse.json(
      { error: 'Failed to convert images to PDF' },
      { status: 500 }
    );
  }
}

// Increase payload size limit for image uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
