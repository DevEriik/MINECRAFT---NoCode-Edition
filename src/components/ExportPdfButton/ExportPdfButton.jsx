import React, { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const ExportPdfButton = ({ elementRef, filename }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    if (!elementRef.current) return;
    try {
      setIsGenerating(true);

      const canvas = await html2canvas(elementRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#9ca3af",
      });
      const pdfWidth = 250;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.log("Error de generacion de PDF", error);
      alert("Hubo un problema al generar el PDF.");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <button
      onClick={handleDownloadPdf}
      disabled={isGenerating}
      className="order-last border-4 border-black px-4 py-2 bg-white text-black font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
    >
      {isGenerating ? "Generando..." : "[ 📥 PDF ]"}
    </button>
  );
};

export default ExportPdfButton;
