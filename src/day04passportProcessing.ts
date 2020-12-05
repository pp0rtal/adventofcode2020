import * as yup from 'yup';
import { compactLines, readFileEntries } from './utils/io';

// byr iyr eyr hgt hcl ecl pid cid
const MANDATORY_FIELDS = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    // 'cid',
];

/**
 * byr (Birth Year) - four digits; at least 1920 and at most 2002.
 * iyr (Issue Year) - four digits; at least 2010 and at most 2020.
 * eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
 * hgt (Height) - a number followed by either cm or in:
 *   If cm, the number must be at least 150 and at most 193.
 *   If in, the number must be at least 59 and at most 76.
 * hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
 * ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
 * pid (Passport ID) - a nine-digit number, including leading zeroes.
 * cid (Country ID) - ignored, missing or not.
 */
const validationSchema = yup.object().shape({
    byr: yup.number().min(1920).max(2002).required(),
    iyr: yup.number().min(2010).max(2020).required(),
    eyr: yup.number().min(2020).max(2030).required(),
    // hgt
    hgt: yup
        .string()
        .matches(/^#[0-9]+((cm)|(cn))$/, 'i')
        .required(),
    hcl: yup
        .string()
        .matches(/^#[0-9a-f]$/, 'i')
        .required(),
    ecl: yup
        .string()
        .oneOf(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])
        .required(),
    pid: yup
        .string()
        .matches(/^[0-9]{9}$/, 'i')
        .required(),
    cid: yup.string().optional(),
});

export default async function main() {
    const exerciseRawInput = await readFileEntries(
        './inputs/day04.txt',
        '\n',
        false,
    );
    const passportConfig = compactLines(exerciseRawInput);

    // Star 8
    const totalValidPassport = countTotalValidPassport(passportConfig, false);
    console.log(
        `total valid VALIDATION [OFF] passport = ${totalValidPassport} out of ${passportConfig.length}`,
    );

    // Star 9
    const totalValidatedPassport = countTotalValidPassport(
        passportConfig,
        true,
    );
    console.log(
        `total valid VALIDATION [ ON] passport = ${totalValidatedPassport} out of ${passportConfig.length}`,
    );
}

export function countTotalValidPassport(passport: string[], validate: boolean) {
    return passport.reduce((totalValid, passport) => {
        return totalValid + (isPassportValid(passport, validate) ? 1 : 0);
    }, 0);
}

export function isPassportValid(infos: string, validate: boolean) {
    let fieldsValues: { [key: string]: string } = {};
    fieldsValues = infos.split(' ').reduce((fields, fieldWithValue) => {
        const [fieldKey, value] = fieldWithValue.split(':');
        fields[fieldKey] = value;
        return fields;
    }, fieldsValues);

    if (!validate) {
        const passportKeys = Object.keys(fieldsValues);
        for (let mandatoryField of MANDATORY_FIELDS) {
            if (!passportKeys.includes(mandatoryField)) {
                return false;
            }
        }
        return true;
    }
}

export function validateFields() {}
