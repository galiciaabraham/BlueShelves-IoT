// src/utils/stringUtils.ts
export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const toTitleCase = (str: string): string =>
  str.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());

export const capitalizeFirstLetter = (str: string): string => 
  str ? str[0].toUpperCase() + str.slice(1) : str;
