export function calculateSum(input: string): number {
    // Remove any whitespace and split the input by commas, newlines, or custom delimiters
    const numbers = input.replace(/\s/g, '').split(/[,\n]|\/\/.\n/);
    
    // Parse and sum the numbers
    return numbers.reduce((sum, num) => {
      const parsedNum = parseInt(num, 10);
      if (isNaN(parsedNum) || parsedNum < 0) {
        return sum; // Ignore non-numbers and negative numbers
      }
      return sum + parsedNum;
    }, 0);
  }