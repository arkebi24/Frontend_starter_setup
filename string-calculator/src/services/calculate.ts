/**
 * Calculates the sum of numbers in a string input with various delimiter options.
 * 
 * @param input - A string containing numbers separated by delimiters.
 * @returns The sum of all valid numbers in the input.
 * @throws {Error} If negative numbers are found in the input.
 * 
 * @example
 * calculateSum("1,2,3") // Returns 6
 * calculateSum("1\n2,3") // Returns 6
 * calculateSum("//;\n1;2;3") // Returns 6
 * calculateSum("//[***]\n1***2***3") // Returns 6
 * calculateSum("//[*][%]\n1*2%3") // Returns 6
 */
export function calculateSum(input: string): number {
    // Return 0 for empty or whitespace-only input
    if (!input.trim()) return 0;

    let delimiter = /[,\n]/; // Default delimiters: comma and newline
    let numbers = input;

    // Check for custom delimiter syntax
    if (input.startsWith('//')) {
        const delimiterEnd = input.indexOf('\n');
        const delimiterPart = input.slice(2, delimiterEnd);
        
        // Handle multiple delimiters enclosed in square brackets
        if (delimiterPart.startsWith('[') && delimiterPart.endsWith(']')) {
            const delimiters = delimiterPart.slice(1, -1).split('][');
            delimiter = new RegExp(delimiters.map(escapeRegExp).join('|'), 'g');
        } else {
            // Single custom delimiter
            delimiter = new RegExp(escapeRegExp(delimiterPart), 'g');
        }
        numbers = input.slice(delimiterEnd + 1);
    }

    // Parse and filter the numbers
    const parsedNumbers = numbers
        .split(delimiter)
        .map(num => num.trim())
        .filter(num => num !== '');

    const negativeNumbers: number[] = [];
    // Calculate the sum while checking for negative numbers and ignoring numbers > 1000
    const sum = parsedNumbers.reduce((acc, num) => {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) return acc;
        if (parsedNum < 0) negativeNumbers.push(parsedNum);
        if (parsedNum > 1000) return acc; // Ignore numbers bigger than 1000
        return acc + parsedNum;
    }, 0);

    // Throw an error if negative numbers are found
    if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return sum;
}

/**
 * Escapes special characters in a string for use in a regular expression.
 * 
 * @param string - The string to escape.
 * @returns The escaped string safe for use in a RegExp.
 */
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}