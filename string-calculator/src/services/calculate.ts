export function calculateSum(input: string): number {
    if (!input.trim()) return 0;

    let delimiter = /[,\n]/;
    let numbers = input;

    if (input.startsWith('//')) {
        const delimiterEnd = input.indexOf('\n');
        const delimiterPart = input.slice(2, delimiterEnd);
        if (delimiterPart.startsWith('[') && delimiterPart.endsWith(']')) {
            delimiter = new RegExp(escapeRegExp(delimiterPart.slice(1, -1)), 'g');
        } else {
            delimiter = new RegExp(escapeRegExp(delimiterPart), 'g');
        }
        numbers = input.slice(delimiterEnd + 1);
    }

    const parsedNumbers = numbers
        .split(delimiter)
        .map(num => num.trim())
        .filter(num => num !== '');

    const negativeNumbers: number[] = [];
    const sum = parsedNumbers.reduce((acc, num) => {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) return acc;
        if (parsedNum < 0) negativeNumbers.push(parsedNum);
        if (parsedNum > 1000) return acc; // Ignore numbers bigger than 1000
        return acc + parsedNum;
    }, 0);

    if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return sum;
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}