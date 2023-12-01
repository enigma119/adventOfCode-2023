import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").split('\n');

const stringDigits: any = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,'six': 6,'seven': 7,'eight': 8,'nine': 9 };

const getFirstCalibration = () => {
    let totalCalibration = 0;
    input.map((line) => {
        let num = line.match(/\d+/g)?.join('');
        const calibration = parseInt(num!.charAt(0).concat(num!.charAt(num!.length - 1)));
        totalCalibration += calibration;
    })
    return totalCalibration;
}

const getSecondCalibration = () => {
    let totalCalibration = 0;
    input.map((line) => {
        let digits = []
        let combinedChar = '';
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            if (Number.isNaN(parseInt(char))) {
                combinedChar += char;
                if(combinedChar.length >= 2) {
                    const value = getResult(combinedChar);
                    if(value) {
                        digits.push(value);
                        combinedChar = char;
                    };
                }
            } else {
                digits.push(parseInt(char));
                combinedChar = '';
            }
        }
        const calibration = parseInt('' + digits[0] + digits[digits!.length - 1]);
        if(calibration) totalCalibration += calibration;
    })
    return totalCalibration;

}

function getResult(digits: any) {
    for(const property in stringDigits) {
        if(digits.includes(property)) {
            return stringDigits[property]
        }
    }
}
 
console.log(getFirstCalibration());
console.log(getSecondCalibration());