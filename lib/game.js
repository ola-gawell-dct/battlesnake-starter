const isWall = require('./is-wall');
const isSnake = require('./is-snake');
const isFood = require('./is-food');

const directions = [
  {
    x: 0,
    y: -1,
    name: 'up',
  },
  {
    x: 0,
    y: 1,
    name: 'down',
  },
  {
    x: -1,
    y: 0,
    name: 'left',
  },
  {
    x: 1,
    y: 0,
    name: 'right',
  },
];

const evaluateAllDirections = body => {
  const allMoves = directions.map(direction => {
    const currentPosition = body.you.body[0];

    const testPosition = {
      x: direction.x + currentPosition.x,
      y: direction.y + currentPosition.y,
      diff: direction,
    };

    const base = {
      ...direction,
      food: 0,
    };

    if (isWall(body.board.width, body.board.height, testPosition)) {
      return {
        ...base,
        isWall: true,
      };
    }

    if (isSnake(body.board.snakes, testPosition)) {
      return {
        ...base,
        isSnakePart: true,
      };
    }

    if (isFood(body.board.food, testPosition)) {
      return {
        ...base,
        food: 1,
      };
    }

    return base;
  });

  return allMoves;
};

// Handle POST request to '/start'
const start = () => {
  // Response data
  const data = {
    color: '#000000',
  };

  return Promise.resolve(data);
};

const move = body => {
  try {
    const directionResults = evaluateAllDirections(body);

    const bestDirections = directionResults
      .filter(result => !result.isWall && !result.isSnakePart)
      .sort((o1, o2) => o2.food - o1.food);

    // Take best direction and if empty return up
    const direction = bestDirections && bestDirections.length > 0 ? bestDirections[0].name : 'up';

    console.log(JSON.stringify(body)); // Print input for debugging and test generation
    console.log(`${body.you.name} turn: ${body.turn}`);
    console.log(`Chosen direction: ${direction}`);

    // Response data
    const data = {
      move: direction,
    };

    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
    return Promise.resolve({ error: err });
  }
};

const end = () => ({});

module.exports = {
  move,
  start,
  end,
};
