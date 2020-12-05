import { expect } from 'chai';

import * as star01 from '../src/day01complementaries';
import {
    countValidLines,
    isLineValidForRange,
    isLineValidForUniqueOffset,
    parsePasswordConfiguration,
} from '../src/day02validateString';

describe('Day 2: Password Philosophy', () => {
    describe('#isLineValidForUniqueOffset', () => {
        it('should return true for a line having min chars', () => {
            expect(isLineValidForRange('1-3 a: abcde')).to.be.true;
        });

        it('should return true for a line having max chars', () => {
            expect(isLineValidForRange('1-3 a: aaabcde')).to.be.true;
        });

        it('should return false for a line not having min chars', () => {
            expect(isLineValidForRange('2-3 a: abcde')).to.be.false;
        });

        it('should return false for a line exceeding max chars', () => {
            expect(isLineValidForRange('2-3 a: aaaabcde')).to.be.false;
        });
    });

    describe('#isLineValidForUniqueOffset', () => {
        it('should return true for first matching position', () => {
            const line = '1-3 a: abcde';

            expect(isLineValidForUniqueOffset(line)).to.be.true;
        });

        it('should return true for last matching position', () => {
            const line = '1-3 a: cdaef';

            expect(isLineValidForUniqueOffset(line)).to.be.true;
        });

        it('should return false for no matching offset', () => {
            const line = '1-3 a: cadef';

            expect(isLineValidForUniqueOffset(line)).to.be.false;
        });

        it('should return false for two matching offset', () => {
            const line = '1-3 a: aaaaaaaa';

            expect(isLineValidForUniqueOffset(line)).to.be.false;
        });
    });

    describe('#countValidLines - using isLineValidForRange', () => {
        it('should return 0 for no input', () => {
            expect(countValidLines([], isLineValidForRange)).to.equal(0);
        });

        it('should return the number of valid password', () => {
            const lines = [
                '1-3 a: abcde',
                '1-3 b: cdefg', // INVALID
                '2-9 c: ccccccccc',
            ];
            expect(countValidLines(lines, isLineValidForRange)).to.equal(2);
        });
    });

    describe('#countValidLines - using isLineValidForUniqueOffset', () => {
        it('should return 0 for no input', () => {
            expect(countValidLines([], isLineValidForRange)).to.equal(0);
        });

        it('should return the number of valid password', () => {
            const lines = [
                '1-3 a: abcde',
                '1-3 b: cdefg', // INVALID
                '2-9 c: ccccccccc', // INVALID
            ];
            expect(countValidLines(lines, isLineValidForUniqueOffset)).to.equal(
                1,
            );
        });
    });
});
