import { promises as fs } from 'fs';

export async function readFileEntries(
    filePath: string,
    separator = '\n',
    dropEmptyLines: boolean = true,
): Promise<string[]> {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const splittedContent = fileContent.split(separator);

    if (!dropEmptyLines) {
        return splittedContent;
    }

    return splittedContent.filter((line) => line.length > 0);
}

export async function parseNumbers(
    inputs: string[],
    separator = '\n',
): Promise<number[]> {
    return inputs.map((value) => Number.parseFloat(value)).filter(isFinite);
}

/**
 * - Empty lines will be dropped
 * - Two non-empty lines will be concatenated with a space
 * @param linesIn
 * @returns Lines with values separated with a space
 */
export function compactLines(linesIn: string[]): string[] {
    const output: string[] = [];

    return linesIn
        .reduce((lines, line) => {
            if (line === '' || !lines.length) {
                lines.push(line);
            } else {
                if (lines[lines.length - 1] === '') {
                    lines[lines.length - 1] = line;
                } else {
                    lines[lines.length - 1] = lines[lines.length - 1].concat(
                        ` ${line}`,
                    );
                }
            }
            return lines;
        }, output)
        .filter((line) => line !== '');
}
