import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');


const getList = (line) => {
    const [listIHave, winningList] = line.split(': ').pop().split(' | ').map(list => list.split(' ').filter(Boolean));
    const winningNumbers = listIHave.filter(item => winningList.includes(item));
    return winningNumbers;
}

const result = () => {
    const winningList = []
    input.reduce((worth, line, index) => {
        const winningNumbers = getList(line);
        winningList.push(winningNumbers);
        worth += getWorth(winningNumbers);
        console.log('winningNumbers', index + 1, winningNumbers, 'worth', worth);
        // const copies = getCopies(index, winningNumbers);
        return worth;
    }, 0);
}

const getWorth = (winningNumbers) => {
    return winningNumbers.length > 0 ? Math.pow(2, winningNumbers.length - 1) : 0;
}

const getCopies = (winningList) => {
    // example [[1,2, 3, 4], [1, 2], [1,2], [1]]
    // in example we have 4 original 
    // find the copies possible for every original
    // 1. find the original
    // 2. find the copies
    // 3. find the subcopies



    let count = 0;

    // original
    // for (let i = 0; i < winningList.length; i++) {
    //     count +=1; // [2, 3, 4]
    //     // copies
    //     for (let j = 1; j < winningList[0].length; j++) {

    //         count +=1; // 
    //         // subcopies
    //         for (let k = 0; k < winningList[0].length; k++) {
    //             count +=1;
    //         }

    //     }
    // }

}




console.log(result())