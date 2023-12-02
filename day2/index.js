import * as fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const countColors = (line) => {
    const colorCounts = { red: 0, green: 0, blue: 0 };
    const colorLimits = { red: 12, green: 13, blue: 14 };
    let isValid = true;
    const cubeSet = line.split(':').pop().split(';');

    cubeSet.forEach((color) => {
        const colorParts = color.trim().split(' ');
        for (let i = 0; i < colorParts.length; i++) {
            const cube = colorParts[i].replaceAll(',', '');
            if (colorCounts.hasOwnProperty(cube) ) {
                const count = parseInt(colorParts[i-1]);
                if(colorLimits[cube] < count) { 
                    isValid = false;
                } 
                if(colorCounts[cube] < count) {
                    colorCounts[cube] = count;
                }
            }
        }
    });

    return {colorCounts, isValid};
}

const result = () => {
    let idsSum = 0;
    let totalCubePower = 0;
    input.forEach((line, index) => {
        const { colorCounts, isValid } = countColors(line);
        const cubePower = Object.values(colorCounts).reduce((a, b) => a * b, 1);
        totalCubePower += cubePower;
        if(isValid) idsSum += (index+ 1);
    });
    return { idsSum, totalCubePower}
}

console.log(result());

