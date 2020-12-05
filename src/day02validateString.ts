import { readFileEntries } from './utils/io';

type ValidationInputs = {
    inputString: string;
    rangeInOccurrences: number;
    rangeOutOccurrences: number;
    searchedChar: string;
};

export default async function star01main() {
    const exerciseRawInput = await readFileEntries('./inputs/day02.txt');

    // Star 3
    const totalValidRange = countValidLines(
        exerciseRawInput,
        isLineValidForRange,
    );
    console.log(
        `total valid password for MIN/MAX "${totalValidRange}" out of ${exerciseRawInput.length}`,
    );

    // Star 4
    const totalValidOffset = countValidLines(
        exerciseRawInput,
        isLineValidForUniqueOffset,
    );
    console.log(
        `total valid password for EXCLUSIVE POSITION "${totalValidOffset}" out of ${exerciseRawInput.length}`,
    );
}

export function countValidLines(lines: string[], validator: Function): number {
    return lines.reduce((totalValid, line) => {
        return totalValid + (validator(line) ? 1 : 0);
    }, 0);
}

export function isLineValidForRange(line: string): boolean {
    const data = parsePasswordConfiguration(line);

    const occurrenceInInput = data.inputString
        .split('')
        .filter((char) => char === data.searchedChar).length;

    return (
        occurrenceInInput >= data.rangeInOccurrences &&
        occurrenceInInput <= data.rangeOutOccurrences
    );
}

export function isLineValidForUniqueOffset(line: string): boolean {
    const data = parsePasswordConfiguration(line);
    const hasOccurence1 =
        data.inputString[data.rangeInOccurrences - 1] === data.searchedChar;
    const hasOccurence2 =
        data.inputString[data.rangeOutOccurrences - 1] === data.searchedChar;

    return (
        (hasOccurence1 && !hasOccurence2) || (!hasOccurence1 && hasOccurence2)
    );
}

export function parsePasswordConfiguration(line: string): ValidationInputs {
    const [occurrences, chars, inputString] = line.split(' ');
    const [min, max] = occurrences.split('-');
    const searchedChar = chars[0];

    return {
        inputString,
        rangeInOccurrences: parseInt(min),
        rangeOutOccurrences: parseInt(max),
        searchedChar,
    };
}
