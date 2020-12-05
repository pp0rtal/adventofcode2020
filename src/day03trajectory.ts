import { readFileEntries } from './utils/io';
import { multiplyNumbers } from './utils/math';

export default async function main() {
    const exerciseRawInput = await readFileEntries('./inputs/day03.txt');

    // Star 5
    const total = browseMap(exerciseRawInput);
    console.log(`Total trees ${total} (lines=${exerciseRawInput.length})`);

    // Star 6
    const patterns = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
    ];
    const patternsResult = patterns.map((pattern) => {
        const total = browseMap(exerciseRawInput, pattern.right, pattern.down);
        console.log(
            `  { right:${pattern.right} down:${pattern.down} } total=${total}`,
        );

        return total;
    });
    console.log(`totals           = ${patternsResult}`);
    console.log(`multiplied total = ${multiplyNumbers(patternsResult)}`);
}

export function browseMap(
    map: string[],
    right: number = 3,
    down: number = 1,
): number {
    let line = 0;
    let col = 0;
    let totalTrees = 0;
    const mapModuloSize = map[0].length;

    while (line <= map.length) {
        col += right;
        line += down;

        if (line < map.length) {
            const element = map[line][col % mapModuloSize];
            if (element === '#') totalTrees++;
        }
    }

    return totalTrees;
}
