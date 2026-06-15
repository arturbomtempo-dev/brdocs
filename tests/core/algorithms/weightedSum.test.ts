import { describe, expect, it } from 'vitest';
import { weightedSum } from '../../../src/core/algorithms';
import {
    CNPJ_FIRST_WEIGHTS,
    CPF_FIRST_WEIGHTS,
    CPF_SECOND_WEIGHTS,
} from '../../../src/core/constants';

describe('weightedSum', () => {
    it('should calculate a simple weighted sum', () => {
        expect(weightedSum('123', [3, 2, 1])).toBe(10);
    });

    it('should calculate another weighted sum', () => {
        expect(weightedSum('1234', [5, 4, 3, 2])).toBe(30);
    });

    it('should calculate cpf first digit sum', () => {
        expect(weightedSum('123456789', CPF_FIRST_WEIGHTS)).toBe(
            1 * 10 + 2 * 9 + 3 * 8 + 4 * 7 + 5 * 6 + 6 * 5 + 7 * 4 + 8 * 3 + 9 * 2
        );
    });

    it('should calculate cpf second digit sum', () => {
        expect(weightedSum('1234567890', CPF_SECOND_WEIGHTS)).toBe(
            1 * 11 + 2 * 10 + 3 * 9 + 4 * 8 + 5 * 7 + 6 * 6 + 7 * 5 + 8 * 4 + 9 * 3 + 0 * 2
        );
    });

    it('should calculate cnpj first digit sum', () => {
        expect(weightedSum('123456780001', CNPJ_FIRST_WEIGHTS)).toBe(
            1 * 5 +
                2 * 4 +
                3 * 3 +
                4 * 2 +
                5 * 9 +
                6 * 8 +
                7 * 7 +
                8 * 6 +
                0 * 5 +
                0 * 4 +
                0 * 3 +
                1 * 2
        );
    });

    it('should return zero for empty string', () => {
        expect(weightedSum('', [])).toBe(0);
    });

    it('should work with zeros', () => {
        expect(weightedSum('0000', [9, 8, 7, 6])).toBe(0);
    });

    it('should throw when weights are shorter than digits', () => {
        expect(() => weightedSum('1234', [4, 3])).toThrow(
            'Digits and weights must have the same length.'
        );
    });

    it('should throw when weights are longer than digits', () => {
        expect(() => weightedSum('12', [5, 4, 3])).toThrow(
            'Digits and weights must have the same length.'
        );
    });
});
