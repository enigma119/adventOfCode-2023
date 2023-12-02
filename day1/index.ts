import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").split('\n');

const stringDigits: { [index: string]: number } = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
};

const getCalibration = (input: string[], calibrationFunction: (line: string) => number) => {
    return input.reduce((totalCalibration, line) => totalCalibration + calibrationFunction(line), 0);
}

const firstCalibrationFunction = (line: string) => {
    let num = line.match(/\d+/g)?.join('');
    return parseInt(num!.charAt(0).concat(num!.charAt(num!.length - 1)));
}


const numbersMapping: { [index: string]: string } = {
    'one': 'one1one',
    'two': 'two2two',
    'three': 'three3three',
    'four': 'four4four',
    'five': 'five5five',
    'six': 'six6six',
    'seven': 'seven7seven',
    'eight': 'eight8eight',
    'nine': 'nine9nine',
}


const secondCalibrationRefactoredFunction = () => {
    let totalCalibration = 0;
    for(let line of input) {
        for (const property in numbersMapping) {
            line = line.replaceAll(new RegExp(property, 'g'), numbersMapping[property]);
            console.log(line);
        }
        const numbers = line.split('').filter(char => !isNaN(parseInt(char)));
        totalCalibration += parseInt(`${numbers[0] + numbers[numbers.length - 1]}`);
    }
}



const secondCalibrationFunction = (line: string) => {
    let digits = []
    let combinedChar = '';
    for (let i = 0; i < line.length; i++) {
        const char = line.charAt(i);
        if (isNaN(parseInt(char))) {
            combinedChar += char;
            if (combinedChar.length >= 3) {
                const value = getChartValue(combinedChar);
                if (value) {
                    digits.push(value);
                    combinedChar = char;
                };
            }
        } else {
            digits.push(parseInt(char));
            combinedChar = '';
        }
    }
    return parseInt('' + digits[0] + digits[digits!.length - 1]);
}

function getChartValue(digits: string) {
    for (const property in stringDigits) {
        if (digits.includes(property)) {
            return stringDigits[property]
        }
    }
}

console.log(getCalibration(input, firstCalibrationFunction));
console.log(getCalibration(input, secondCalibrationFunction));
console.log(secondCalibrationRefactoredFunction());
