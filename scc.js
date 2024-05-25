const fs = require('fs');
function main(){

    fs.readFile('scc\\edge.txt' ,'utf-8' ,(err, data) => {
        if(err){
            console.error(err);
            return;
        }
        const graph = [];
        var current = 1;
        for(let line of data.split('\n')){
            let temp = line.split(/\s+/);
            temp.pop()
            if(temp[0] != current){
                if(Int(current) > 1) //???
                let nodeArray = [];
                nodeArray.push(temp[1])

            }else{
                nodeArray.push(temp[1])
            }

            console.log(temp);
            break;
        }




    });
}
function find_scc(graph){

    const finishing_times = 0;

    function dfs(graph, vis, node) {
        // If the current node is the destination, return true
    
        vis[node] = 1;
        for (let x of graph[node]) {
            if (!vis[x]) {
                dfs(graph, vis, x);
                
            }
        }

    }



}

class Stack{
    constructor(){
        this.items = [];
    }
    push (item){
        this.items.push(item);
    }
    pop(){
        if(this.items.length == 0){
            return 'empty';
        }
        return this.items.pop()
    }
    isEmpty(){
    // return true if stack is empty
    return this.items.length == 0;
    }
}
main()
