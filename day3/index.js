import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

const result = () => {
    let total = 0
    let lines = []
    input.forEach((line, index) => {
        let lineSeparation = line.split('.')
        lineSeparation.forEach((data, i) => {
            if (specialChars.test(data) === true && data.length > 1) {
                data = [data.slice(0, data.indexOf(specialChars)), data.slice(data.indexOf(specialChars))]
                // if (isNaN(data[0]) === false) {
                //     total += parseInt(data[0])
                // } else {
                //     total += parseInt(data[1])
                // }
                lineSeparation.splice(i, 1, ...data)
            }
        })
        lines.push(lineSeparation)
        const inlineTotal = getTopLine(lines[index - 1], lineSeparation)
        if (inlineTotal) {
            total += inlineTotal
        }


    });
    console.log(total)
}

function getTopLine(previousLine, currentLine) {
    let total = 0


    for (let i = 0; i < currentLine.length; i++) {
        const current = currentLine[i];
        const previous = currentLine[i - 1];
        const next = currentLine[i + 1];
        if (isNaN(current) === false && current !== '') {
            if (next && specialChars.test(next) === true) {
                console.log('direct', current)
                total += parseInt(current)
            }
            if (!previousLine) return;

            const top = getString(i, current.length + i + 1, previousLine)
            if (top && specialChars.test(top) === true) {
                console.log('top', top, current)
                total += parseInt(current)
            }
        }
    }

    if(!previousLine && currentLine) return;

    for (let i = 0; i < previousLine.length; i++) {
        const current = previousLine[i];
        if (isNaN(current) === false && current !== '') {
            const top = getString(i, current.length + i + 1, currentLine)
            if (top && specialChars.test(top) === true) {
                console.log('bottom', top, current)
                total += parseInt(current)
            }
        }
    }
    return total
}

function getBottomLine(currentLine, previousLine) {
    for (let i = 0; i < previousLine.length; i++) {
        const current = previousLine[i];
        if (isNaN(current) === false && current !== '') {
            const top = getString(i, current.length + i + 1, currentLine)
            if (top && specialChars.test(top) === true) {
                console.log('bottom', top, current)
                total += parseInt(current)
            }
        }
    }
}

// function getTopLine(previousLine, currentLine) {
//     for (let i = 0; i < currentLine.length; i++) {
//         const current = currentLine[i];
//         // const previous = currentLine[i - 1];
//         // const next = currentLine[i + 1];
//         if (isNaN(current) === false && current !== '') {
//             // if (next && specialChars.test(next) === true) {
//             //     total += parseInt(current)
//             // }
//             // console.log('current', current)
//             if (!previousLine) return;

//             const top = getString(i, current.length + i + 1, previousLine)
//             if (top && specialChars.test(top) === true) {
//                 console.log('top', top, current)
//                 total += parseInt(current)
//             }
//         }
//     }
// }

function getString(start, end, line) {
    let str = ''
    for (let i = start; i < end; i++) {
        str += line[i]
    }
    return str
}

console.log(result());
