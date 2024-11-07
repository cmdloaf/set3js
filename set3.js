/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
    // Write your code here
}

/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
    const size = board.length;
    
    // Check rows
    for (let row = 0; row < size; row++) {
        if (board[row][0] && board[row].every(cell => cell === board[row][0])) {
            return board[row][0];
        }
    }
    
    // Check columns
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
    
    // Check diagonal (top-left to bottom-right)
    let diagonal1Winner = board[0][0];
    let isDiagonal1Winner = !!diagonal1Winner;
    
    for (let i = 1; i < size; i++) {
        if (board[i][i] !== diagonal1Winner) {
            isDiagonal1Winner = false;
            break;
        }
    }
    
    if (isDiagonal1Winner) return diagonal1Winner;
    
    // Check diagonal (top-right to bottom-left)
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

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */

function eta(firstStop, secondStop, routeMap) {
    // If start and end are the same, return 0
    if (firstStop === secondStop) return 0;
    
    // Create a structured graph from the route map
    const graph = {};
    for (const route in routeMap) {
        const [from, to] = route.split(',');
        if (!graph[from]) graph[from] = {};
        graph[from][to] = routeMap[route].travel_time_mins;
    }
    
    // Initialize distances and visited nodes
    const distances = {};
    const visited = new Set();
    
    // Initialize all distances to Infinity
    for (const route in routeMap) {
        const [from, to] = route.split(',');
        distances[from] = Infinity;
        distances[to] = Infinity;
    }
    distances[firstStop] = 0;
    
    while (true) {
        // Find the unvisited node with smallest distance
        let currentStop = null;
        let shortestDistance = Infinity;
        
        for (const stop in distances) {
            if (!visited.has(stop) && distances[stop] < shortestDistance) {
                currentStop = stop;
                shortestDistance = distances[stop];
            }
        }
        
        // If we can't find an unvisited node, or we've reached our destination, break
        if (currentStop === null || currentStop === secondStop) break;
        
        // Mark current node as visited
        visited.add(currentStop);
        
        // Update distances to neighboring stops
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
