export const getFormattedDate = (date: Date, separator?: "/"|"-"): string => {
    const day = String(date.getDate()).padStart(2,'0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const separatorValue = separator || "/";

    return `${day}${separatorValue}${month}${separatorValue}${year}`;
}