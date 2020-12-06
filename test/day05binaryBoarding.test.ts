import { expect } from 'chai';

import { browseMap } from '../src/day03trajectory';
import {
    countTotalValidPassport,
    isPassportValid,
    validateFields,
} from '../src/day04passportProcessing';
import { compactLines } from '../src/utils/io';
import {
    decodeSeatPosition,
    findMissingId,
    getSeatId,
} from '../src/day05binaryBoarding';

describe('Day 5: Binary Boarding', () => {
    describe('#decodeSeatPosition', () => {
        it('should return seat position', () => {
            expect(decodeSeatPosition('FBFBBFFRLR')).to.deep.equal({
                row: 44,
                col: 5,
            });

            expect(decodeSeatPosition('BFFFBBFRRR')).to.deep.equal({
                row: 70,
                col: 7,
            });

            expect(decodeSeatPosition('FFFBBBFRRR')).to.deep.equal({
                row: 14,
                col: 7,
            });

            expect(decodeSeatPosition('BBFFBBFRLL')).to.deep.equal({
                row: 102,
                col: 4,
            });
        });
    });

    describe('#getSeatId', () => {
        it('should return the position id', () => {
            expect(getSeatId({ row: 44, col: 5 })).to.equal(357);
            expect(getSeatId({ row: 70, col: 7 })).to.equal(567);
            expect(getSeatId({ row: 14, col: 7 })).to.equal(119);
            expect(getSeatId({ row: 102, col: 4 })).to.equal(820);
        });
    });

    describe('#findMissingId', () => {
        it('should find the first number', () => {
            expect(findMissingId([0, 1, 3, 4, 6])).to.equal(2);
        });

        it('should return the lowest value when no discontinuation', () => {
            expect(findMissingId([1, 2, 3])).to.equal(0);
            expect(findMissingId([2, 3, 4])).to.equal(1);
        });

        it('should return the last value when no discontinuation and 0 is took', () => {
            expect(findMissingId([0, 1, 2])).to.equal(3);
        });
    });
});
