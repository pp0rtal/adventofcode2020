import { expect } from 'chai';

import * as star01 from '../src/day01complementaries';

describe('Star 1/2 - complementaries', () => {
    describe('#indexNumbers', () => {
        it('should create a hashmap of numbers with their occurrence', () => {
            const numbers = [1721, 979, 366, 299, 675, 1456, 1456, 1456];

            const map = star01.indexNumbers(numbers);

            expect(map).to.deep.equal({
                1721: 1,
                979: 1,
                366: 1,
                299: 1,
                675: 1,
                1456: 3,
            });
        });
    });

    describe('#findComplementaryNumbers', () => {
        it('should return the tuple of numbers having a specific sum', () => {
            const numbers = [1721, 979, 366, 299, 675, 1456];
            const indexedNumbers = star01.indexNumbers(numbers);

            const tuple = star01.find2SizedTupleNumbers(indexedNumbers, 2020);

            expect(tuple).to.deep.equal([299, 1721]);
        });

        it('should return null when no tuple if found', () => {
            const numbers = [1721, 979, 366, 299, 675, 1456];
            const indexedNumbers = star01.indexNumbers(numbers);

            const tuple = star01.find2SizedTupleNumbers(indexedNumbers, 2021);

            expect(tuple).to.equal(null);
        });
    });
});
