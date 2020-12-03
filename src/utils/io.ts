import { promises as fs } from 'fs';

export async function readFileEntries(
    filePath: string,
    separator = '\n',
): Promise<string[]> {
    const fileContent = await fs.readFile(filePath, 'utf8');

    return fileContent.split(separator);
}

export async function parseNumbers(
    inputs: string[],
    separator = '\n',
): Promise<number[]> {
    return inputs.map((value) => Number.parseFloat(value)).filter(isFinite);
}
