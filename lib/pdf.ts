import { jsPDF } from "jspdf";

export function downloadPDF(markdown: string) {
  const doc = new jsPDF();
  
  // Configure text wrapping
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  const maxWidth = pageWidth - 2 * margin;
  
  // Split text into lines that fit within page width
  const lines = doc.splitTextToSize(markdown, maxWidth);
  
  // Add lines to document
  lines.forEach((line: string, index: number) => {
    if (index * lineHeight >= doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      index = 0;
    }
    doc.text(line, margin, margin + (index * lineHeight));
  });
  
  doc.save("extracted-text.pdf");
}