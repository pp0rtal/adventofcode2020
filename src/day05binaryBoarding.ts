import { readFileEntries } from './utils/io';

type SeatPosition = {
    row: number;
    col: number;
};

export default async function main() {
    const exerciseRawInput = await readFileEntries('./inputs/day05.txt');

    // Star 9
    const seatIds = getSeatIds(exerciseRawInput);
    console.log(seatIds);
    console.log(`The maximum id is ${Math.max(...seatIds)}`);

    // Star 10
    const missingId = findMissingId(seatIds);
    console.log(
        seatIds
            .sort(function (a, b) {
                return b - a;
            })
            .join(' '),
    );
    console.log(`Missing Id: ${missingId}`);
}

export function getSeatIds(encodedPositions: string[]) {
    return encodedPositions
        .map((encodedPosition) => decodeSeatPosition(encodedPosition))
        .map((position) => getSeatId(position));
}

export function decodeSeatPosition(encodedPosition: string): SeatPosition {
    let minRow = 0;
    let maxRow = 127;
    let minCol = 0;
    let maxCol = 7;

    for (let c of encodedPosition.split('')) {
        switch (c) {
            case 'F':
                maxRow = maxRow - (maxRow - minRow + 1) / 2;
                break;
            case 'B':
                minRow = minRow + (maxRow - minRow + 1) / 2;
                break;
            case 'L':
                maxCol = maxCol - (maxCol - minCol + 1) / 2;
                break;
            case 'R':
                minCol = minCol + (maxCol - minCol + 1) / 2;
                break;
        }
    }

    return {
        row: minRow,
        col: minCol,
    };
}

export function findMissingId(seatIds: number[]): number {
    const orderedIds = seatIds.sort((a, b) => a - b);
    let previous = orderedIds[0];

    for (let i = 1; i < orderedIds.length; i++) {
        if (orderedIds[i] - previous > 1) {
            return previous + 1;
        }
        previous = orderedIds[i];
    }

    // Handle extreme position
    if (orderedIds[0] > 0) {
        return orderedIds[0] - 1;
    } else {
        return orderedIds[orderedIds.length - 1] + 1;
    }
}

export function getSeatId(position: SeatPosition) {
    return position.row * 8 + position.col;
}
