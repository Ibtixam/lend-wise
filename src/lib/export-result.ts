import { domToPng } from "modern-screenshot";
import { jsPDF } from "jspdf";

const CAPTURE_OPTIONS = {
  backgroundColor: "#000000",
  scale: 2,
  fetch: {
    requestInit: {
      cache: "no-cache",
    },
  },
} as const;

async function captureAsDataUrl(element: HTMLElement): Promise<string> {
  return domToPng(element, CAPTURE_OPTIONS);
}

export async function downloadResultAsPng(
  element: HTMLElement,
  filename = "lendwise-assessment.png",
): Promise<void> {
  const dataUrl = await captureAsDataUrl(element);
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function downloadResultAsPdf(
  element: HTMLElement,
  filename = "lendwise-assessment.pdf",
): Promise<void> {
  const dataUrl = await captureAsDataUrl(element);

  const image = await loadImage(dataUrl);
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  const margin = 10;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const imgHeight = (image.height * contentWidth) / image.width;

  let heightLeft = imgHeight;
  let y = margin;

  pdf.addImage(dataUrl, "PNG", margin, y, contentWidth, imgHeight);
  heightLeft -= pageHeight - margin * 2;

  while (heightLeft > 0) {
    pdf.addPage();
    y = margin - (imgHeight - heightLeft);
    pdf.addImage(dataUrl, "PNG", margin, y, contentWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;
  }

  pdf.save(filename);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
