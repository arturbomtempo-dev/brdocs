import { describe, expect, it } from 'vitest';
import { applyPattern } from '../../../src/core/formatting/applyPattern';

describe('applyPattern', () => {
    it('should format cpf', () => {
        expect(applyPattern('12345678909', '###.###.###-##')).toBe('123.456.789-09');
    });

    it('should format cnpj', () => {
        expect(applyPattern('12345678000195', '##.###.###/####-##')).toBe('12.345.678/0001-95');
    });

    it('should format cep', () => {
        expect(applyPattern('30130010', '#####-###')).toBe('30130-010');
    });

    it('should return empty string', () => {
        expect(applyPattern('', '###.###')).toBe('');
    });

    it('should stop when value ends', () => {
        expect(applyPattern('123', '###.###.###-##')).toBe('123');
    });

    it('should ignore remaining digits', () => {
        expect(applyPattern('123456789', '###')).toBe('123');
    });

    it('should work without separators', () => {
        expect(applyPattern('123', '###')).toBe('123');
    });

    it('should format single digit', () => {
        expect(applyPattern('1', '###.###')).toBe('1');
    });

    it('should format partial cpf', () => {
        expect(applyPattern('1234', '###.###.###-##')).toBe('123.4');
    });

    it('should format partial cpf 2', () => {
        expect(applyPattern('1234567', '###.###.###-##')).toBe('123.456.7');
    });

    it('should format partial cnpj', () => {
        expect(applyPattern('1234567', '##.###.###/####-##')).toBe('12.345.67');
    });

    it('should not append trailing separators', () => {
        expect(applyPattern('12', '##.###.###')).toBe('12');
    });
});
