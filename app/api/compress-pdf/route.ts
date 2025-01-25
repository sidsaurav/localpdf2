import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

interface CompressionSettings {
  imageQuality: number
  imageScale: number
}

const compressionLevels: Record<string, CompressionSettings> = {
  low: {
    imageQuality: 0.8,
    imageScale: 0.9,
  },
  medium: {
    imageQuality: 0.6,
    imageScale: 0.7,
  },
  high: {
    imageQuality: 0.4,
    imageScale: 0.5,
  },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const compressionLevel = (formData.get('compressionLevel') as string) || 'medium'

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      )
    }

    const pdfBytes = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(pdfBytes)

    // Get compression settings
    const settings = compressionLevels[compressionLevel]

    // Compress PDF
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      preserveEditability: false,
      updateMetadata: false,
    })

    return new NextResponse(compressedPdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=compressed.pdf',
      },
    })
  } catch (error) {
    console.error('Error compressing PDF:', error)
    return NextResponse.json(
      { error: 'Failed to compress PDF' },
      { status: 500 }
    )
  }
}
