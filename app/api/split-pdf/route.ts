import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const splitMethod = formData.get('splitMethod') as string
    const pageRange = formData.get('pageRange') as string
    const mergeInOne = formData.get('mergeInOne') === 'true'

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      )
    }

    const pdfBytes = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const pageCount = pdfDoc.getPageCount()

    // Parse page ranges
    const pageRanges = pageRange.split(',').map(range => {
      const [start, end] = range.split('-').map(num => parseInt(num) - 1)
      return { start, end }
    })

    if (mergeInOne) {
      // Create a single PDF with all selected ranges
      const newPdf = await PDFDocument.create()
      
      for (const range of pageRanges) {
        const pages = await newPdf.copyPages(pdfDoc, 
          Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i)
        )
        pages.forEach(page => newPdf.addPage(page))
      }

      const mergedPdfBytes = await newPdf.save()
      
      return new NextResponse(mergedPdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="merged.pdf"'
        }
      })
    } else {
      // Create a ZIP with separate PDFs
      const zip = new JSZip()

      for (let i = 0; i < pageRanges.length; i++) {
        const range = pageRanges[i]
        const newPdf = await PDFDocument.create()
        
        const pages = await newPdf.copyPages(pdfDoc, 
          Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i)
        )
        pages.forEach(page => newPdf.addPage(page))
        
        const pdfBytes = await newPdf.save()
        zip.file(`range_${i + 1}.pdf`, pdfBytes)
      }

      const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })

      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="split.zip"'
        }
      })
    }
  } catch (error) {
    console.error('Error processing PDF:', error)
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    )
  }
}
