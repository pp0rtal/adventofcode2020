import { parseNumbers, readFileEntries } from './utils/io';

type IndexedNumbers = { [key: number]: number };

export default async function star01main() {
    const exerciseRawInput = await readFileEntries('./inputs/star01.txt');
    const numbers = await parseNumbers(exerciseRawInput);
    const indexedNumbers = indexNumbers(numbers);

    // Star 1
    const tuple2 = find2SizedTupleNumbers(indexedNumbers, 2020);
    console.info(tuple2);
    if (!tuple2) {
        throw new Error('no complementary');
    }
    console.log(tuple2[0] * tuple2[1]);

    // Star 2
    const tuple3 = find3SizedTupleNumbers(indexedNumbers, 2020);
    console.info(tuple3);
    if (!tuple3) {
        throw new Error('no complementary');
    }
    console.log(tuple3[0] * tuple3[1] * tuple3[2]);
}

export function find3SizedTupleNumbers(
    indexedNumbers: IndexedNumbers,
    targetSum: number,
): [number, number, number] | null {
    const numbers = Object.keys(indexedNumbers).map(parseFloat);

    for (let num1offset = 0; num1offset < numbers.length; num1offset++) {
        for (
            let num2offset = num1offset + 1;
            num2offset < numbers.length;
            num2offset++
        ) {
            const complementary =
                targetSum - numbers[num1offset] - numbers[num2offset];

            if (numbers.includes(complementary, num2offset + 1)) {
                return [
                    numbers[num1offset],
                    numbers[num2offset],
                    complementary,
                ];
            }
        }
    }

    return null;
}

export function find2SizedTupleNumbers(
    indexedNumbers: IndexedNumbers,
    targetSum: number,
): [number, number] | null {
    const numbers = Object.keys(indexedNumbers).map(parseFloat);

    for (const number of numbers) {
        const complementary = targetSum - number;

        if (indexedNumbers[complementary]) {
            return [number, complementary];
        }
    }

    return null;
}

export function indexNumbers(values: number[]): IndexedNumbers {
    return values.reduce((map: IndexedNumbers, key) => {
        map[key] = (map[key] || 0) + 1;
        return map;
    }, {});
}
