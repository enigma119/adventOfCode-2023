import * as fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');
const seeds = input[0].split(': ')[1].split(' ').map(Number);

const mapNames = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];
const divider = 1

let results = new Array(mapNames.length + 1).fill([])

let separatedAlmanacs = separateAlmanacs()

function solution1() {
    results[0] = seeds

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
    return lowestLocation
}

function solution2() {
    results[0] = groupSeedByRanngeOfTwo(seeds)
    console.log('results[0]', results[0])
    // results[0] = seeds

    for (let i = 0; i < separatedAlmanacs.length; i++) {
        const almanac = separatedAlmanacs[i];
        let ranges = almanac.values.map(getValueFromRangeAndDivider);
        results[i + 1] = results[i].map(searchValue => {
            let found = false;
            for (let i = 0; i < ranges.length; i++) {
                const foundValue = findCorrespondingInDestinationRange(ranges[i].sourceRange, ranges[i].destinationRange, searchValue)
                if (foundValue) {
                    found = true;
                    return foundValue*divider
                }
            }
            if (!found) {
                return searchValue*divider
            }
        });
    }
    const lowestLocation = results[results.length - 1].reduce((a, b) => Math.min(a, b));
    // console.log('results', results);

    console.log('lowestLocation', lowestLocation)
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

function getValueFromRangeAndDivider(range) {
    const [start, offset, length] = range;
    const sourceRange = [(offset/divider), (offset/divider) + (length/divider) - 1];
    const destinationRange = [(start/divider), (start/divider) + (length/divider) - 1];
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

function groupSeedByRanngeOfTwo(seed) {
    let response = []
    let count = 0;
    for (let i = 0; i < seed.length; i++) {
        const element = (seed[i]/divider);
        console.log('---seed element----', element)
        if (count === 1) {
            for (let j = 0 - divider; j < element; j++/divider) {
                let dividedIndex = (i/divider ) - (1/divider)
                let dividedIndex2 = (j/divider)
                response.push(seed[dividedIndex]*divider + (dividedIndex2*divider))
            }
            count = 0
        } else {
            count++
        }
    }
    return response
}

// solution1()
solution2()

if (isMainThread) {
    // This code runs in the main thread
  
    // Prepare the data for the worker
    const inputData = /* your input data for the heavy calculation */;
  
    // Create a new worker and pass the data
    const worker = new Worker(__filename, {
      workerData: inputData
    });
  
    // Listen for messages from the worker
    worker.on('message', result => {
      console.log('Result from worker:', result);
    });
  
  } else {
    // This code runs in the worker thread
  
    // Get the data from the main thread
    const inputData = workerData;
  
    // Perform heavy computation
    const result = performHeavyCalculation(inputData);
  
    // Send the result back to the main thread
    parentPort.postMessage(result);
  }
  
  function performHeavyCalculation(inputData) {
    // Your heavy computation logic goes here
    let result = /* perform your heavy calculation */;
    return result;
  }