import * as os from 'os';
import * as path from 'path';
import { promises as fs } from 'fs';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as ioUtils from '../../src/utils/io';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Utils - IO', () => {
    const tmpDir = os.tmpdir();
    let tmpFile: string;

    beforeEach(async () => {
        tmpFile = path.join(tmpDir, `test-${Math.random()}`);
    });

    afterEach(async () => {
        try {
            await fs.unlink(tmpFile);
        } catch (err) {}
    });

    describe('#readFileEntries', () => {
        it('should read file and return each lines by default', async () => {
            const input = 'line1\n' + 'line2\n' + '\n' + 'line4\n' + '';
            await fs.writeFile(tmpFile, input);

            const lines = await ioUtils.readFileEntries(tmpFile);

            expect(lines).to.deep.equal(['line1', 'line2', '', 'line4', '']);
        });

        it('should return each values separated by a space char', async () => {
            const input = 'val1 val2  val3';
            await fs.writeFile(tmpFile, input);

            const lines = await ioUtils.readFileEntries(tmpFile, ' ');

            expect(lines).to.deep.equal(['val1', 'val2', '', 'val3']);
        });

        it('should throw a FS error if the file does not exists', async () => {
            await expect(ioUtils.readFileEntries(tmpFile)).to.be.rejectedWith(
                Error,
                'ENOENT: no such file or directory',
            );
        });
    });

    describe('#readFileSeparatedNumbers', () => {
        it('should return an array of all valid numbers', async () => {
            const inputs = ['566', '0', '-1.56', '.50', '1e10', ' +6'];

            const lines = await ioUtils.parseNumbers(inputs, ' ');

            expect(lines).to.deep.equal([566, 0, -1.56, 0.5, 1e10, 6]);
        });

        it('should omit invalid numbers', async () => {
            const inputs = ['text', 'NaN', '', '-', '\n'];

            const lines = await ioUtils.parseNumbers(inputs, ' ');

            expect(lines).to.deep.equal([]);
        });
    });
});
