import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

const solution1 = () => {
    let total = 0
    let lines = []
    input.forEach((line, index) => {
        line = line.trim()
        let stringValues = { value: '', indexes: [], lineIndex: index }
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if(char === ' ') continue
            if (isNaN(parseInt(char)) === false) {
                stringValues.indexes.push(i)
                stringValues.value += char
            } else {
                if (stringValues.value.length > 0) {
                    lines.push(stringValues)
                    stringValues = { value: '', indexes: [], lineIndex: index }
                }
            }
            if(i === line.length - 1 && stringValues.value.length > 0) lines.push(stringValues)
        }
    })
    const lineTotal = getValues(lines)
    if (lineTotal) total += lineTotal
    console.log(total)

}

function testIfSpecialChar(startIndex, endIndex, line, lineIndex, verifyType) {

    startIndex = startIndex - 1 < 0 ? 0 : startIndex - 1
    endIndex = endIndex > line?.length ? endIndex : endIndex + 1

    for (let i = startIndex; i < endIndex+1; i++) {
        const char = line[i];
        if (specialChars.test(char) === true) {
            if (char === '*') {
                console.log('******', lineIndex, verifyType, i)
            }
            return true
        }
    }
    return false
}

function getValues(lines) {
    let total = 0
    const secontTotal = 0
    for (let i = 0; i < lines.length; i++) {
        let isCounted = false

        const line = lines[i];
        let startIndex = parseInt(line.indexes[0])
        let endIndex = parseInt(line.indexes[line.indexes.length - 1])
        let lastValue = +line.indexes[line.indexes.length - 1] + 1
        let firstValue = +(line.indexes[0] - 1)
        let value = parseInt(line.value)
        console.log(line, 'lastValue', lastValue)

        if (specialChars.test(input[line.lineIndex][lastValue]) === true) {
            total += parseInt(value)
            isCounted = true
            console.log('direct', value)
        } 
        if(!isCounted && input[line.lineIndex][firstValue] && specialChars.test(input[line.lineIndex][firstValue]) === true) {
            total += parseInt(value)
            console.log('direct ----', value)
        }
        const nextLine = input[line.lineIndex + 1]
        if (nextLine) {
            const nextLineValues = testIfSpecialChar(startIndex, endIndex, nextLine, line.lineIndex, 'bottom')
            if (nextLineValues) {
                total += value
                console.log('bottom', value)
            }
        }
        let previousLine = input[line.lineIndex - 1]

        if (previousLine) {
            const previousLineValues = testIfSpecialChar(startIndex, endIndex, previousLine, line.lineIndex, 'top')
            if (previousLineValues) {
                total += value
                console.log('top', value)
            }
        }
    }

    return total
}

console.log(solution1())
// firstTry 190650
// secondTry 504467 too low
// thirdTry  554404 too hight

// fourthTry 553735 not right one
// fifthTry 562662 not right one
// sixthTry 516276 not right one
// seventhTry 553079 right one

// ex 128 i 127 ---
