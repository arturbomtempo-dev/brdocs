export function applyPattern(value: string, pattern: string): string {
    let result = '';

    let valueIndex = 0;

    for (const char of pattern) {
        if (char === '#') {
            if (valueIndex >= value.length) {
                break;
            }

            result += value[valueIndex];
            valueIndex++;

            continue;
        }

        if (valueIndex < value.length) {
            result += char;
        }
    }

    return result;
}
