
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
        var sccs = kosaraju(graph);
        console.log(sccs.length);
    });
}

/**
 * Stack class for DFS traversal.
 */
class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * Push an element onto the stack.
     * @param {*} element - The element to be pushed.
     */
    push(element) {
        this.items.push(element);
    }

    /**
     * Pop an element from the stack.
     * @returns {*} The popped element.
     */
    pop() {
        if (this.items.length === 0) {
            return "Underflow";
        }
        return this.items.pop();
    }

    /**
     * Check if the stack is empty.
     * @returns {boolean} True if the stack is empty, false otherwise.
     */
    isEmpty() {
        return this.items.length === 0;
    }
}

/**
 * Calculate the strongly connected components (SCCs) using Kosaraju's algorithm.
 * @param {Object} graph - The graph represented as an adjacency list.
 * @returns {Array} An array of SCCs.
 */
/**
 * Performs the Kosaraju's algorithm to find the strongly connected components (SCCs) in a directed graph.
 *
 * @param {Object} graph - The directed graph represented as an object, where each key represents a node and its value is an array of its neighbors.
 * @returns {Array<Array<number>>} - An array of arrays, where each inner array represents a strongly connected component (SCC) in the graph.
 */
function kosaraju(graph) {
    const keys = Object.keys(graph);
    const n = keys.length;
    const visited = Array(n).fill(false);
    const stack = new Stack();

    // First DFS to calculate finishing times
    /**
     * Performs a depth-first search starting from the given node.
     * @param {any} node - The starting node for the depth-first search.
     */
    function dfs1(node) {
        const localStack = [node];
        while (localStack.length > 0) {
            const current = localStack[localStack.length - 1];
            if (!visited[current]) {
                visited[current] = true;
                if (graph[current]) {
                    for (let neighbor of graph[current]) {
                        if (!visited[neighbor]) {
                            localStack.push(neighbor);
                        }
                    }
                }
            } else {
                localStack.pop();
                stack.push(current);
            }
        }
    }

    // Build the reverse graph
    const reverseGraph = {};
    for (let key in graph) {
        for (let neighbor of graph[key]) {
            if (!reverseGraph[neighbor]) {
                reverseGraph[neighbor] = [];
            }
            reverseGraph[neighbor].push(parseInt(key));
        }
    }

    // Perform DFS on each node to get finishing times
    for (let i = 0; i < n; i++) {
        if (!visited[keys[i]]) {
            dfs1(parseInt(keys[i]));
        }
    }

    // Second DFS on the reverse graph
    const visitedReverse = Array(n).fill(false);
    const sccs = [];

    function dfs2(node, scc) {
        const localStack = [node];
        while (localStack.length > 0) {
            const current = localStack.pop();
            if (!visitedReverse[current]) {
                visitedReverse[current] = true;
                scc.push(current);
                if (reverseGraph[current]) {
                    for (let neighbor of reverseGraph[current]) {
                        if (!visitedReverse[neighbor]) {
                            localStack.push(neighbor);
                        }
                    }
                }
            }
        }
    }

    while (!stack.isEmpty()) {
        const node = stack.pop();
        if (!visitedReverse[node]) {
            const scc = [];
            dfs2(node, scc);
            sccs.push(scc);
        }
    }

    return sccs;
}

main();