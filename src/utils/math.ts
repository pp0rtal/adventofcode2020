export function multiplyNumbers(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }

    return numbers.reduce((total, number) => total * number, 1);
}
