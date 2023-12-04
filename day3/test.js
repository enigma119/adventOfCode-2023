import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

const solution1 = () => {
    let solution1 = 0
    let solution2 = 0
    let lines = []
    input.forEach((line, index) => {
        line = line.trim()
        let stringValues = { value: '', indexes: [], lineIndex: index }
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === ' ') continue
            if (isNaN(parseInt(char)) === false) {
                stringValues.indexes.push(i)
                stringValues.value += char
            } else {
                if (stringValues.value.length > 0) {
                    lines.push(stringValues)
                    stringValues = { value: '', indexes: [], lineIndex: index }
                }
            }
            if (i === line.length - 1 && stringValues.value.length > 0) lines.push(stringValues)
        }
    })
    const solution = getValues(lines)
    if (solution.solution1) solution1 += solution.solution1
    if (solution.solution2) solution2 += solution.solution2
    console.log(solution1, solution2)

}

function testIfSpecialChar(startIndex, endIndex, line, lineIndex, verifyType) {

    startIndex = startIndex - 1 < 0 ? 0 : startIndex - 1
    endIndex = endIndex > line?.length ? endIndex : endIndex + 1

    for (let i = startIndex; i < endIndex + 1; i++) {

        const char = line[i];
        if (specialChars.test(char) === true) {
            if (char === '*') {
                // console.log('******', lineIndex, verifyType, i)
                return { isSpecialChar: true, index: i }
            }
            return { isSpecialChar: true, index: null }
        }
    }
    return { isSpecialChar: false, index: null }
}

function getValues(lines) {
    let total = 0
    let secontTotal = 0
    let arr = []

    for (let i = 0; i < lines.length; i++) {
        let isCounted = false

        const line = lines[i];
        let startIndex = parseInt(line.indexes[0])
        let endIndex = parseInt(line.indexes[line.indexes.length - 1])
        let lastValue = +line.indexes[line.indexes.length - 1] + 1
        let firstValue = +(line.indexes[0] - 1)
        let value = parseInt(line.value)
        // console.log(line, 'lastValue', lastValue)

        if (specialChars.test(input[line.lineIndex][lastValue]) === true) {
            total += parseInt(value)
            isCounted = true
        }
        if (!isCounted && input[line.lineIndex][firstValue] && specialChars.test(input[line.lineIndex][firstValue]) === true) {
            total += parseInt(value)
        }

        const nextLine = input[line.lineIndex + 1]
        if (nextLine) {
            const nextLineValues = testIfSpecialChar(startIndex, endIndex, nextLine, line.lineIndex, 'bottom')
            if (nextLineValues.isSpecialChar) {
                total += value
            }
            if (nextLineValues.index) {
                const newResult = getGear(startIndex, endIndex, nextLine)
                if (newResult.doesExist) {
                    console.log('newResult', newResult.value)
                    if (!arr.find(x => x.line === line.lineIndex + 1 && x.index === nextLineValues.index)) {
                        arr.push({ index: nextLineValues.index, line: line.lineIndex + 1, value1: value, value2: null })
                    }
                }
            }

            let previousLine = input[line.lineIndex - 1]
            if (previousLine) {
                const previousLineValues = testIfSpecialChar(startIndex, endIndex, previousLine, line.lineIndex, 'top')
                if (previousLineValues.isSpecialChar) {
                    total += value
                }
                if (previousLineValues.index) {
                    // if(!arr.find(x => x.index === previousLineValues.index)) {
                    //     arr.push({index: previousLineValues.index, value2: value})
                    // } else {
                    if (arr.find(x => x.line === line.lineIndex - 1 && x.index === previousLineValues.index)) {
                        arr.find(x => x.index === previousLineValues.index).value2 = value
                        // console.log('found', arr.find(x => x.index === previousLineValues.index))
                    }
                    // }
                }
            }

        }
        //get arr power
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.value1 && item.value2) {
                const power = item.value1 * item.value2
                // console.log('topValue------', item.value1, 'bottomValue', item.value2, 'power', power)
                secontTotal += power
            }
        }
        // console.log('arr', arr)
        return { solution1: total, solution2: secontTotal }
    }
}


    console.log(solution1())
    // firstTry 190650
    // secondTry 504467 too low
    // thirdTry  554404 too hight

    // fourthTry 553735 not right one
    // fifthTry 562662 not right one
    // sixthTry 516276 not right one
    // seventhTry 553079 right one


    /////// part 2
    // 1827477 too low
    // 29310814 too low

    // ex 128 i 127 ---

    function getGear(startIndex, endIndex, line) {
        startIndex = startIndex - 1 < 0 ? 0 : startIndex - 1
        endIndex = endIndex > line?.length ? endIndex : endIndex + 1
        let result = ''
        let doesExist = false
        for (let i = startIndex; i < endIndex + 1; i++) {
            const char = line[i];
            if (specialChars.test(char) === true && char == '*') {
                doesExist = true
            }
            result += char
        }
        return { doesExist: doesExist, result: result }
    }
