import { expect } from 'chai';

import {
    getCompoundResponsesInGroup,
    getMutualResponsesInGroup,
} from '../src/day06customCustoms';

describe('Day 6: Custom Customs', () => {
    describe('#getCompoundResponsesInGroup', () => {
        it('should merge unique responses', () => {
            expect(getCompoundResponsesInGroup('abc')).to.equal('abc');
            expect(getCompoundResponsesInGroup('a a a')).to.equal('a');
            expect(getCompoundResponsesInGroup('ab ac')).to.equal('abc');
        });
    });

    describe('#getMutualResponsesInGroup', () => {
        it('should return mutual responses in all groups', () => {
            expect(getMutualResponsesInGroup('abc ab')).to.equal('ab');
            expect(getMutualResponsesInGroup('a b c')).to.equal('');
            expect(getMutualResponsesInGroup('a a a a')).to.equal('a');
        });
    });
});
