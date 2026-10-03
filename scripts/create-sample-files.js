const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. Valid minimal PDF
const pdfLines = [
  '%PDF-1.4',
  '1 0 obj',
  '<< /Type /Catalog /Pages 2 0 R >>',
  'endobj',
  '2 0 obj',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  'endobj',
  '3 0 obj',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  'endobj',
  '4 0 obj',
  '<< /Length 56 >>',
  'stream',
  'BT',
  '/F1 20 Tf',
  '100 700 Td',
  '(Selenium & Playwright Automation Sample PDF) Tj',
  'ET',
  'endstream',
  'endobj',
  '5 0 obj',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  'endobj',
  'xref',
  '0 6',
  '0000000000 65535 f ',
  '0000000009 00000 n ',
  '0000000058 00000 n ',
  '0000000115 00000 n ',
  '0000000244 00000 n ',
  '0000000351 00000 n ',
  'trailer',
  '<< /Size 6 /Root 1 0 R >>',
  'startxref',
  '427',
  '%%EOF'
];
fs.writeFileSync(path.join(dir, 'sample-document.pdf'), pdfLines.join('\n'));

// 2. CSV
const csvContent = 'id,filename,format,size_kb,category\n101,sample-document.pdf,PDF,120,Documents\n102,sample-image.png,PNG,45,Images\n103,test-dataset.csv,CSV,15,Data\n';
fs.writeFileSync(path.join(dir, 'sample-data.csv'), csvContent);

// 3. PNG (16x16 valid blue PNG)
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVDhPY/wPBAwUACMYNWAMGBgAvd8EBtS1G6sAAAAASUVORK5CYII=';
fs.writeFileSync(path.join(dir, 'sample-image.png'), Buffer.from(pngBase64, 'base64'));

console.log('Sample download files created successfully in public/downloads');
