import moment from "moment";

export const convertDate = (originalDate: string) => {
  const formattedDate = moment(originalDate).format("DD/MM/YYYY");

  return formattedDate; // Output: 29/06/2023
};

export function limitString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str; // Return the original string if it is shorter or equal to the maxLength
  } else {
    const truncatedString = str.substring(0, maxLength); // Get the substring up to the maxLength
    return truncatedString + "..."; // Append '...' to the truncated string
  }
}

export function convertToSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "_");
}
