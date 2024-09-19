export function calculateSum(input: string): number {
    if (!input.trim()) return 0;

    const numbers = input
        .split(/[,\n]|\/\/.\n/)
        .map(num => num.trim())
        .filter(num => num !== '');

    return numbers.reduce((sum, num) => {
        const parsedNum = parseInt(num, 10);
        if (!isNaN(parsedNum) && parsedNum >= 0) {
            return sum + parsedNum;
        }
        return sum;
    }, 0);
}