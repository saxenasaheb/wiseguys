const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vST62CEHZKlPsU1vg2d6ljSxqdCuTqZ6L3dovqKIyCOQ44EO3mgX9_r58L-fCdzj2stnT26mjj2Jyko/pub?output=csv';

export async function fetchQuotes() {
    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log("Fetched data:", data.substring(0, 200) + "..."); // Log the first 200 characters
        return parseCSV(data);
    } catch (error) {
        console.error("Error fetching quotes:", error);
        throw error;
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
            return obj;
        }, {});
    });
}

export function getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
}