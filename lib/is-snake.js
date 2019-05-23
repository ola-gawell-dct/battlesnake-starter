const isSnake = (snakes, testPosition) => {
  return snakes
    .map(snake => snake.body)
    .reduce((a, b) => a.concat(b), [])
    .find(snake => snake.x === testPosition.x && snake.y === testPosition.y);
};

module.exports = isSnake;
