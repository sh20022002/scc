
/**
 * Read the 'edge.txt' file, parse the data, and calculate the strongly connected components (SCCs) using Kosaraju's algorithm.
 */
const fs = require('fs');

/**
 * Main function to read the file, parse the data, and calculate the SCCs.
 */
function main() {
    fs.readFile('scc\\edge.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const graph = {};
        let current = 1;
        var tempArray = [];
        for (let line of data.split('\n')) {
            let temp = line.split(/\s+/).map(item => parseInt(item));
            temp.pop();

            if (temp[0] == current) {
                tempArray.push(temp[1]);
            } else {
                let key = `${current}`;
                graph[key] = tempArray;
                current = temp[0];
                tempArray = [];
                tempArray.push(temp[1]);
            }
        }
        var sccs = kosarajus(graph);
        console.log(sccs);
    });
}

/**
 * Stack class for DFS traversal.
 */
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.items.length === 0) return "Underflow";
        return this.items.pop();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    top() {
        return this.items[this.items.length - 1];
    }
}