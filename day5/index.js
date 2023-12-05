import * as fs from 'fs';
import { sep } from 'path';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');
const seeds = input[0].split(': ')[1].split(' ').map(Number);

const mapNames = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];

let results = new Array(mapNames.length + 1).fill([])
results[0] = seeds


let separatedAlmanacs = separateAlmanacs()

function getResult() {
    for (let i = 0; i < separatedAlmanacs.length; i++) {
        const almanac = separatedAlmanacs[i];
        let ranges = almanac.values.map(getValueFromRange);
        results[i + 1] = results[i].map(searchValue => {
            let found = false;
            for (let i = 0; i < ranges.length; i++) {
                const foundValue = findCorrespondingInDestinationRange(ranges[i].sourceRange, ranges[i].destinationRange, searchValue)
                if (foundValue) {
                    found = true;
                    return foundValue
                }
            }
            if (!found) {
                return searchValue
            }
        });
    }
    const lowestLocation = results[results.length - 1].reduce((a, b) => Math.min(a, b));
    console.log('lowestLocation', lowestLocation)
    console.log('results', results);
}

function separateAlmanacs() {
    let currentMapIndex = -1;

    const maps = mapNames.map(name => ({ name, values: [] }));

    input.slice(1).forEach(line => {
        if (line.endsWith('map:')) {
            currentMapIndex++;
        } else if (line !== '') {
            maps[currentMapIndex].values.push(line.split(' ').map(Number));
        }
    });
    return maps;
}


function getValueFromRange(range) {
    const [start, offset, length] = range;
    const sourceRange = [offset, offset + length - 1];
    const destinationRange = [start, start + length - 1];
    return { sourceRange, destinationRange };
}

function findCorrespondingInDestinationRange(sourceRange, destinationRange, searchvalue) {
    if (searchvalue >= sourceRange[0] && searchvalue <= sourceRange[1]) {
        let result = searchvalue - sourceRange[0] + destinationRange[0]
        return result
    } else {
        return null
    }
}

getResult()
