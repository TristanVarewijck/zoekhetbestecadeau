import { pdfDownload } from "@/lib/utils";
import { Download } from "lucide-react";

interface DownloadPdfProps {
  buttonText: string;
  folderRoute: string;
  fileName: string;
}

const DownloadPdf = ({
  buttonText,
  folderRoute,
  fileName,
}: DownloadPdfProps) => {
  return (
    <p
      onClick={() => pdfDownload(folderRoute, fileName)}
      className="w-auto flex items-center gap-2 underline cursor-pointer text-[hsl(var(--primary))]"
    >
      <span>{buttonText}</span>
      <span>
        <Download size={18} />
      </span>
    </p>
  );
};

export default DownloadPdf;
