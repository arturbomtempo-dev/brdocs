export function weightedSum(digits: string, weights: readonly number[]): number {
    if (digits.length !== weights.length) {
        throw new Error('Digits and weights must have the same length.');
    }

    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        sum += Number(digits[i]) * weights[i]!;
    }

    return sum;
}
