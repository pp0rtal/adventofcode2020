import { compactLines, readFileEntries } from './utils/io';
import { sum } from './utils/math';

export default async function main() {
    const exerciseRawInput = await readFileEntries(
        './inputs/day06.txt',
        '\n',
        false,
    );
    const responsesInGroup = compactLines(exerciseRawInput);

    // Star 11
    const totalResponsesByGroup = responsesInGroup
        .map(getCompoundResponsesInGroup)
        .map((responses) => responses.length);
    console.log(totalResponsesByGroup);
    console.log(`Sum of compound responses = ${sum(...totalResponsesByGroup)}`);

    // Star 10
    const totalMutualResponsesByGroup = responsesInGroup
        .map(getMutualResponsesInGroup)
        .map((responses) => responses.length);
    console.log(totalMutualResponsesByGroup);
    console.log(
        `Sum of mutual responses = ${sum(...totalMutualResponsesByGroup)}`,
    );
}

export function getCompoundResponsesInGroup(response: string) {
    const indexResponse: { [key: string]: number } = {};
    const uniformedResponse = response.replace(/ /g, '');
    for (const c of uniformedResponse) {
        indexResponse[c] = 1;
    }

    return Object.keys(indexResponse).join('');
}

export function getMutualResponsesInGroup(rawResponses: string) {
    const responseByGroup = rawResponses.split(' ');
    const mergedResponses = responseByGroup.map(getCompoundResponsesInGroup);
    const index: { [key: string]: number } = {};

    mergedResponses.forEach((mergedResponse) => {
        for (const c of mergedResponse) {
            index[c] = (index[c] || 0) + 1;
        }
    });

    return Object.keys(index)
        .filter((response) => index[response] === responseByGroup.length)
        .join('');
}
