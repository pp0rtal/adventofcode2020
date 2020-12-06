import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { multiplyNumbers, sum } from '../../src/utils/math';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Utils - Math', () => {
    describe('#multiplyNumbers', () => {
        it('should return 0 with empty numbers', async () => {
            expect(multiplyNumbers([])).to.equal(0);
        });

        it('should return 0 when 0 is within array', async () => {
            expect(multiplyNumbers([999, 0])).to.equal(0);
        });

        it('should return only number value', async () => {
            expect(multiplyNumbers([999])).to.equal(999);
        });

        it('should return multiplication of all numbers', async () => {
            expect(multiplyNumbers([2, 7, 3, 4, 2])).to.equal(336);
        });
    });

    describe('#sum', () => {
        it('should sum up numbers', () => {
            expect(sum()).to.equal(0);
            expect(sum(1, 4)).to.equal(5);
        });
    });
});
