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

    return parsedNumbers.reduce((sum, num) => {
        const parsedNum = parseInt(num, 10);
        if (!isNaN(parsedNum) && parsedNum >= 0) {
            return sum + parsedNum;
        }
        return sum;
    }, 0);
}