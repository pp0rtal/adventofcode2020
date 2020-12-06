import { expect } from 'chai';

import { browseMap } from '../src/day03trajectory';
import {
    countTotalValidPassport,
    isPassportValid,
    validateFields,
} from '../src/day04passportProcessing';
import { compactLines } from '../src/utils/io';

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

    describe('#validateFields', () => {
        const validPassport = {
            ecl: 'gry',
            pid: '860033327',
            eyr: '2020',
            hcl: '#fffffd',
            byr: '1937',
            iyr: '2017',
            cid: '147',
            hgt: '183cm',
        };

        function extendValid(object: object) {
            return { ...validPassport, ...object };
        }

        it('should return true for a valid passport', () => {
            expect(validateFields(validPassport)).to.be.true;
        });

        it('should ensure byr (birth year) is at least 1920 and at most 2002', () => {
            expect(validateFields(extendValid({ byr: '1920' }))).to.be.true;
            expect(validateFields(extendValid({ byr: '2002' }))).to.be.true;
            expect(validateFields(extendValid({ byr: '1919' }))).to.be.false;
            expect(validateFields(extendValid({ byr: '2003' }))).to.be.false;
        });

        it('should ensure iyr (issue year) is at least 2010 and at most 2020', () => {
            expect(validateFields(extendValid({ iyr: '2010' }))).to.be.true;
            expect(validateFields(extendValid({ iyr: '2020' }))).to.be.true;
            expect(validateFields(extendValid({ iyr: '2009' }))).to.be.false;
            expect(validateFields(extendValid({ iyr: '2021' }))).to.be.false;
        });

        it('should ensure eyr (expiration year) is at least 2020 and at most 2030', () => {
            expect(validateFields(extendValid({ eyr: '2020' }))).to.be.true;
            expect(validateFields(extendValid({ eyr: '2030' }))).to.be.true;
            expect(validateFields(extendValid({ eyr: '2019' }))).to.be.false;
            expect(validateFields(extendValid({ eyr: '2031' }))).to.be.false;
        });

        it('should ensure hgt (height) is at least 150 and at most 193 centimeters', () => {
            expect(validateFields(extendValid({ hgt: '150cm' }))).to.be.true;
            expect(validateFields(extendValid({ hgt: '193cm' }))).to.be.true;
            expect(validateFields(extendValid({ hgt: '149cm' }))).to.be.false;
            expect(validateFields(extendValid({ hgt: '194cm' }))).to.be.false;
        });

        it('should ensure hgt (height) is at least 59 and at most 76 inches', () => {
            expect(validateFields(extendValid({ hgt: '59in' }))).to.be.true;
            expect(validateFields(extendValid({ hgt: '76in' }))).to.be.true;
            expect(validateFields(extendValid({ hgt: '58in' }))).to.be.false;
            expect(validateFields(extendValid({ hgt: '77in' }))).to.be.false;
        });

        it('should ensure hcl (hair color) is a # followed by exactly six characters 0-9 or a-f', () => {
            expect(validateFields(extendValid({ hcl: 'aaaaaa' }))).to.be.false;
            expect(validateFields(extendValid({ hcl: '#aaaaag' }))).to.be.false;
            expect(validateFields(extendValid({ hcl: '#aaaaaaa' }))).to.be
                .false;
            expect(validateFields(extendValid({ hcl: '#aaaaa' }))).to.be.false;
            expect(validateFields(extendValid({ hcl: '#aaa' }))).to.be.false;

            expect(validateFields(extendValid({ hcl: '#000000' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#999999' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#aaaaaa' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#ffffff' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#012345' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#6789ab' }))).to.be.true;
            expect(validateFields(extendValid({ hcl: '#cdefff' }))).to.be.true;
        });

        it('should ensure ecl (eye color) to be one of: amb blu brn gry grn hzl oth', () => {
            expect(validateFields(extendValid({ ecl: 'amb' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'blu' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'brn' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'gry' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'grn' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'hzl' }))).to.be.true;
            expect(validateFields(extendValid({ ecl: 'oth' }))).to.be.true;

            expect(validateFields(extendValid({ ecl: 'www' }))).to.be.false;
        });

        it('should ensure pid (passport id) to be a nine-digit number, including leading zeroes', () => {
            expect(validateFields(extendValid({ pid: '00000000' }))).to.be
                .false;
            expect(validateFields(extendValid({ pid: '0000000000' }))).to.be
                .false;
            expect(validateFields(extendValid({ pid: '00000000a' }))).to.be
                .false;

            expect(validateFields(extendValid({ pid: '000000000' }))).to.be
                .true;
            expect(validateFields(extendValid({ pid: '123456789' }))).to.be
                .true;
            expect(validateFields(extendValid({ pid: '000001234' }))).to.be
                .true;
        });
    });

    describe('#totalValidPassport', () => {
        it('should return total of valid passport with no content validation', () => {
            const passports = [
                'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm',
                'ecl:gry ',
                'ecl:gry ',
            ];

            expect(countTotalValidPassport(passports, false)).to.equal(1);
        });

        it('should total 0 for bunch of invalid passports', () => {
            const passports = compactLines(
                `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`.split('\n'),
            );

            expect(countTotalValidPassport(passports, true)).to.equal(0);
        });

        it('should total all bunch of valid passports', () => {
            const passports = compactLines(
                `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`.split(
                    '\n',
                ),
            );

            console.log(passports);

            expect(countTotalValidPassport(passports, true)).to.equal(4);
        });
    });
});
