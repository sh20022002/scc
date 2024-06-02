
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
        // console.log(graph['1']);
        var sccs = kosarajus(graph);
        sccs = sccs.filter(scc => scc.length > 31);
        console.log(sccs[0].length), console.log(sccs[1].length), console.log(sccs[2].length), console.log(sccs[3].length);
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
function kosarajus(graph) {
    let stack = new Stack();
    let visited = {};
    let sccs = {};
    let reversedGraph = reverseGraphf(graph);
    function DFS(graph, vertex, visited, scc = null) {
        visited[vertex] = true;
        
        for (let neighbor in graph[vertex]) {
            if (!visited[neighbor]) {
                scc.push(neighbor);
                DFS(graph, neighbor, visited, scc);
            }
        }
        
        if (scc !== null) {
            sccs[vertex] = scc;
        }
        
        }
    }
    function reverseGraphf(graph) {
        const reversedGraph = {};
    
        // Initialize the reversed graph with empty arrays for each vertex
        for (let vertex in graph) {
            if (graph.hasOwnProperty(vertex)) {
                reversedGraph[vertex] = [];
            }
        }
    
        // Iterate over each vertex and its edges
        for (let vertex in graph) {
            if (graph.hasOwnProperty(vertex)) {
                graph[vertex].forEach(edge => {
                    // If the edge vertex is not yet in the reversedGraph, initialize it
                    if (!reversedGraph.hasOwnProperty(edge)) {
                        reversedGraph[edge] = [];
                    }
                    // Add the reverse edge
                    reversedGraph[edge].push(vertex);
                });
            }
        }
    
        return reversedGraph;
    }
    for (let vertex in reversedGraph) {
        if (!visited[vertex]) {
            DFS(reversedGraph, vertex, visited);
        }
    }
    visited = {};
    while (!stack.isEmpty()) {
        let vertex = stack.pop();
        if (!visited[vertex]) {
            let scc = [];
            DFS(graph, vertex, visited, scc);
            sccs.push(scc);
        }
    }
    return sccs;
    
}
main();