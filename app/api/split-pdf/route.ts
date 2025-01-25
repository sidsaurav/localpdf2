import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const splitMethod = formData.get('splitMethod') as string
    const pageRange = formData.get('pageRange') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      )
    }

    const pdfBytes = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const pageCount = pdfDoc.getPageCount()

    // Determine which pages to extract
    let pagesToExtract: number[] = []
    if (splitMethod === 'all') {
      pagesToExtract = Array.from({ length: pageCount }, (_, i) => i)
    } else if (splitMethod === 'range') {
      // Parse page range string (e.g., "1-3,5,7-9")
      pagesToExtract = pageRange.split(',').flatMap(range => {
        const [start, end] = range.split('-').map(num => parseInt(num) - 1)
        if (end === undefined) return [start]
        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
      })
    }

    // Create a ZIP file to store all split PDFs
    const zip = new JSZip()

    // Split PDF into individual pages
    for (const pageNum of pagesToExtract) {
      if (pageNum >= 0 && pageNum < pageCount) {
        const newPdf = await PDFDocument.create()
        const [page] = await newPdf.copyPages(pdfDoc, [pageNum])
        newPdf.addPage(page)
        const pdfBytes = await newPdf.save()
        zip.file(`page_${pageNum + 1}.pdf`, pdfBytes)
      }
    }

    // Generate ZIP file
    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=split.zip',
      },
    })
  } catch (error) {
    console.error('Error splitting PDF:', error)
    return NextResponse.json(
      { error: 'Failed to split PDF' },
      { status: 500 }
    )
  }
}
