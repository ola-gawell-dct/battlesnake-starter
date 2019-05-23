const isSnake = (foods, testPosition) => {
  return foods.find(food => food.x === testPosition.x && food.y === testPosition.y);
};

module.exports = isSnake;
