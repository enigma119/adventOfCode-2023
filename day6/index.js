import * as fs from 'fs';

let input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const parseInput = (line) => line.split(':')[1].split(' ').filter(Boolean).map(Number);

const part1 = () => {
    const parsedInput = input.map(parseInput);
    return findTotalWins(parsedInput);
}

const part2 = () => {
    const parsedInput = input.map(parseInput).map(line => [line.join('')].map(Number));
    return findTotalWins(parsedInput);
}

function findTotalWins(input) {
    return input[0].reduce((totalWin, time, i) => {
        const distance = input[1][i];
        const win = findWins(time, distance);
        return totalWin ? totalWin * win : win;
    }, 0);
}

function findWins(time, distance) {
    let win = 0;
    for (let i = 0; i < time; i++) {
        if (i * (time - i) > distance) {
            win++;
        }
    }
    return win;
}

// console.log(part1());
console.log(part2());