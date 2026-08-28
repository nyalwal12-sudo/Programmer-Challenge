const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Paths to CSV and JSON files
const csvPath = join(__dirname, '..', 'catalog dev.csv');
const jsonPath = join(__dirname, 'JSONdata-storage.json');

// Parses through a CSV row and returns an array
function parseCsvRow(row) {
    // Track quoted fields so commas inside a CSV value are preserved.
    const values = [];
    let value = '';
    let insideQuotes = false;

    // Iterate through each character in the row
    for (let index = 0; index < row.length; index += 1) {
        const character = row[index];
        const nextCharacter = row[index + 1];

        if (character === '"' && insideQuotes && nextCharacter === '"') {
            value += '"';
            index += 1;
        } else if (character === '"') {
            insideQuotes = !insideQuotes;
        } else if (character === ',' && !insideQuotes) {
            values.push(value.trim());
            value = '';
        } else {
            value += character;
        }
    }

    values.push(value.trim());
    return values;
}

// Reads and converts the CSV file to JSON format
const lines = readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(Boolean);
const headers = parseCsvRow(lines.shift());
const courses = lines.map(line => {
    const values = parseCsvRow(line);
    return headers.reduce((course, header, index) => {
        course[header] = values[index] || '';
        return course;
    }, {});
});

// Writes courses to JSON file
writeFileSync(jsonPath, `${JSON.stringify(courses, null, 2)}\n`);
console.log(`Converted ${courses.length} courses to ${jsonPath}`);