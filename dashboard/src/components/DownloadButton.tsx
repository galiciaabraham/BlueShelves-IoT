// src/components/DownloadButton.tsx
'use client';

import { downloadCSV } from '@/utils/reportGenerator';

interface DownloadButtonProps {
  data: any[];
  fields: any[];
  filename: string;
  children: React.ReactNode;
}

export default function DownloadButton({
  data,
  fields,
  filename,
  children,
}: DownloadButtonProps) {
  return (
    <button
      onClick={() => downloadCSV(data, fields, filename)}
      className="bg-blue-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-blue-700 transition whitespace-nowrap"
    >
      {children}
    </button>
  );
}
