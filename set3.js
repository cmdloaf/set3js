function relationshipStatus(fromMember, toMember, socialGraph) {
    if (!socialGraph[fromMember] || !socialGraph[toMember]) {
        return "no relationship";
    }
    const fromFollowsTo = socialGraph[fromMember].following.includes(toMember);
    const toFollowsFrom = socialGraph[toMember].following.includes(fromMember);
    
    if (fromFollowsTo && toFollowsFrom) {
        return "friends";
    } else if (fromFollowsTo) {
        return "follower";
    } else if (toFollowsFrom) {
        return "followed by";
    } else {
        return "no relationship";
    }
}

function ticTacToe(board) {
    const size = board.length;
    

    for (let row = 0; row < size; row++) {
        if (board[row][0] && board[row].every(cell => cell === board[row][0])) {
            return board[row][0];
        }
    }
    

    for (let col = 0; col < size; col++) {
        let winner = board[0][col];
        let isWinner = true;
        
        if (!winner) continue;
        
        for (let row = 1; row < size; row++) {
            if (board[row][col] !== winner) {
                isWinner = false;
                break;
            }
        }
        
        if (isWinner) return winner;
    }

    let diagonal1Winner = board[0][0];
    let isDiagonal1Winner = !!diagonal1Winner;
    
    for (let i = 1; i < size; i++) {
        if (board[i][i] !== diagonal1Winner) {
            isDiagonal1Winner = false;
            break;
        }
    }
    
    if (isDiagonal1Winner) return diagonal1Winner;
    
    let diagonal2Winner = board[0][size - 1];
    let isDiagonal2Winner = !!diagonal2Winner;
    
    for (let i = 1; i < size; i++) {
        if (board[i][size - 1 - i] !== diagonal2Winner) {
            isDiagonal2Winner = false;
            break;
        }
    }
    
    if (isDiagonal2Winner) return diagonal2Winner;
    
    return "NO WINNER";
}

function eta(firstStop, secondStop, routeMap) {
    if (firstStop === secondStop) return 0;
    
    const graph = {};
    for (const route in routeMap) {
        const [from, to] = route.split(',');
        if (!graph[from]) graph[from] = {};
        graph[from][to] = routeMap[route].travel_time_mins;
    }

    const distances = {};
    const visited = new Set();
    
    for (const route in routeMap) {
        const [from, to] = route.split(',');
        distances[from] = Infinity;
        distances[to] = Infinity;
    }
    distances[firstStop] = 0;
    
    while (true) {
        let currentStop = null;
        let shortestDistance = Infinity;
        
        for (const stop in distances) {
            if (!visited.has(stop) && distances[stop] < shortestDistance) {
                currentStop = stop;
                shortestDistance = distances[stop];
            }
        }
        if (currentStop === null || currentStop === secondStop) break;
    
        visited.add(currentStop);
        
        if (graph[currentStop]) {
            for (const [nextStop, time] of Object.entries(graph[currentStop])) {
                if (!visited.has(nextStop)) {
                    const newDistance = distances[currentStop] + time;
                    if (newDistance < distances[nextStop]) {
                        distances[nextStop] = newDistance;
                    }
                }
            }
        }
    }
    
    return distances[secondStop] === Infinity ? -1 : distances[secondStop];
}
