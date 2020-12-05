import { expect } from 'chai';

import { browseMap } from '../src/day03trajectory';
import {
    countTotalValidPassport,
    isPassportValid,
} from '../src/day04passportProcessing';

describe('Day 4: Passport Processing', () => {
    describe('#isPassportValid', () => {
        describe('Validation turned OFF', () => {
            it('should return false for empty line', () => {
                expect(isPassportValid('', false)).to.be.false;
            });

            it('should return true if all fields are set', () => {
                const passport =
                    'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm';
                expect(isPassportValid(passport, false)).to.be.true;
            });

            it('should return true if all fields are set but cid is not', () => {
                const passport =
                    'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 hgt:183cm';
                expect(isPassportValid(passport, false)).to.be.true;
            });

            it('should return false if any other field is missing', () => {
                const passport =
                    'ecl:gry pid:860033327 hcl:#fffffd byr:1937 iyr:2017 hgt:183cm';
                expect(isPassportValid(passport, false)).to.be.false;
            });
        });
    });

    describe('#totalValidPassport', () => {
        it('should return total of valid passport', () => {
            const passports = [
                'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm',
                'ecl:gry ',
                'ecl:gry ',
            ];

            expect(countTotalValidPassport(passports, false)).to.equal(1);
        });
    });
});
