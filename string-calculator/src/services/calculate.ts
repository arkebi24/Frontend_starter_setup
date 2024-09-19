export function calculateSum(input: string): number {
    if (!input.trim()) return 0;

    let delimiter = /[,\n]/;
    let numbers = input;

    if (input.startsWith('//')) {
        const parts = input.split('\n', 2);
        delimiter = new RegExp(parts[0].slice(2));
        numbers = parts[1];
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