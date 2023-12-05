import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const getLists = (line) => {
    const [listIHave, winningList] = line.split(': ').pop().split(' | ').map(list => list.split(' ').filter(Boolean));
    const winningSet = new Set(winningList);
    const winningNumbers = listIHave.filter(item => winningSet.has(item));
    return winningNumbers;
}

const getWorth = (winningNumbers) => {
    return winningNumbers.length > 0 ? Math.pow(2, winningNumbers.length - 1) : 0;
}

const result = () => {
    let cardCopies = new Array(input.length).fill(1);

    const worth = input.reduce((totalWorth, line, index) => {
        const winningNumbers = getLists(line);
        if (winningNumbers.length > 0 && cardCopies[index + winningNumbers.length]) {
            for (let i = index + 1; i < index + winningNumbers.length + 1; i++) {
                cardCopies[i] += cardCopies[index]
            }
        }
        return totalWorth + getWorth(winningNumbers);
    }, 0);

    const sum = cardCopies.reduce((sum, item) => sum + item, 0)
    return { worth, sum };
}

console.log(result())