// src/utils/reportGenerator.ts
import Parser from "@json2csv/plainjs/Parser.js";
import { getFormattedDate } from "./stringUtils";

export function downloadCSV(data: any[], fields: any[], filename: string) {
  const json2csvParser = new Parser({ fields, delimiter: ";" });
  const csv = json2csvParser.parse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const generateFileName = (fileType: string): string => {
    const date = new Date();
    const formattedDate = getFormattedDate(date);
    return `blueshelves_items_report_${formattedDate}.${fileType}`;
};
