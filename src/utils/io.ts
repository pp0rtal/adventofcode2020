import { promises as fs } from 'fs';

export async function readFileEntries(
    filePath: string,
    separator = '\n',
    dropEmptyLines: boolean = false,
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
