import "./styles.css";

let level = 0;
let queue = [];
let possibleMoves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function isMoveValid(knightPosition) {
  let currentPosition = knightPosition[0]; // where current position is [x, y]
  let visitedPositions = knightPosition[1];
  for (let i = 0; i < possibleMoves.length; i++) {
    let possibleMove = possibleMoves[i];
    let proposedMove = [
      currentPosition[0] + possibleMove[0],
      currentPosition[1] + possibleMove[1],
    ];
    if (
      proposedMove[0] >= 0 &&
      proposedMove[0] <= 7 &&
      proposedMove[1] >= 0 &&
      proposedMove[1] <= 7 &&
      !knightPosition[1].some(
        (arr) => arr[0] === proposedMove[0] && arr[1] === proposedMove[1],
      )
    ) {
      level = knightPosition[2] + 1; // increment move level only if it is a valid move
      queue.push([proposedMove, [...visitedPositions, proposedMove], level]);
    }
  }
}

// knightPosition [[x,y], [[x,y],[x2,y2]], level] where knightPosition[1] is an array of visited positions

function knightMoves(start, end) {
  let knightPosition = [start, [], level];

  queue.push([start, [start], level]);

  while (queue.length > 0) {
    let nextQueueItem = queue.shift();
    let nextMove = nextQueueItem[0];
    let visitedPositions = nextQueueItem[1];
    level = nextQueueItem[2];

    if (nextMove[0] === end[0] && nextMove[1] === end[1]) {
      return { level, path: visitedPositions }; // Return the total level and the path
    }

    knightPosition = [nextMove, visitedPositions, level];
    isMoveValid(knightPosition); // Check all valid moves from this position
  }
}

// // Test case
let start = [3, 3]; // Starting position
let end = [4, 3]; // Destination position

let result = knightMoves(start, end);
let path = result.path;
console.log(`You made it in ${result.level} moves! Here's your path:`);
path.forEach((pair) => console.log(`[${pair[0]}, ${pair[1]}]`));
