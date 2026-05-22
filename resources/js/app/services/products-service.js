export async function get_products_service() {
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/11tds5mFC_AFWpSjVso01SWCLQ99gbCS0shJP6jr7Hb0/edit#gid=1880039227`;

    // Extract spreadsheet ID from the URL
    const idMatch = spreadsheetUrl.match(/\/d\/([^/]+)/);
    const spreadsheetId = idMatch ? idMatch[1] : null;

    // Extract gid (referred to as sheetName in the PHP code) from the URL
    const gidMatch = spreadsheetUrl.match(/gid=([^&]+)/);
    const sheetName = gidMatch ? gidMatch[1] : null;

    if (!spreadsheetId || !sheetName) {
        return "Invalid URL format";
    }

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${sheetName}`;

    try {
        // SSL verification is handled automatically by fetch.
        // Disabling it manually is not needed for google.com and isn't supported natively in standard fetch.
        const response = await fetch(url);

        if (response.ok) {
            // Equivalent to status === 200
            const csvData = await response.text();
            const rows = csvData.trim().split(/\r?\n/);
            rows.shift();
            const values = rows.map((row) => {
                const parsedRow = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                return parsedRow.map((cell) =>
                    cell.replace(/^"|"$/g, "").trim(),
                );
            });

            return values;
        } else {
            return "Error fetching spreadsheet data";
        }
    } catch (error) {
        // Handle exception
        return error.message;
    }
}
