"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const input = fs.readFileSync("input.txt", "utf8").split('\n');
const stringDigits = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 };
const getFirstCalibration = () => {
    let totalCalibration = 0;
    input.map((line) => {
        var _a;
        let num = (_a = line.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.join('');
        const calibration = parseInt(num.charAt(0).concat(num.charAt(num.length - 1)));
        totalCalibration += calibration;
    });
    return totalCalibration;
};
const getSecondCalibration = () => {
    let totalCalibration = 0;
    input.map((line) => {
        let digits = [];
        let combinedChar = '';
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            if (Number.isNaN(parseInt(char))) {
                combinedChar += char;
                if (combinedChar.length >= 2) {
                    const value = getResult(combinedChar);
                    if (value) {
                        digits.push(value);
                        combinedChar = char;
                    }
                    ;
                }
            }
            else {
                digits.push(parseInt(char));
                combinedChar = '';
            }
        }
        const calibration = parseInt('' + digits[0] + digits[digits.length - 1]);
        if (calibration)
            totalCalibration += calibration;
    });
    return totalCalibration;
};
function getResult(digits) {
    for (const property in stringDigits) {
        if (digits.includes(property)) {
            return stringDigits[property];
        }
    }
}
console.log(getFirstCalibration());
console.log(getSecondCalibration());
