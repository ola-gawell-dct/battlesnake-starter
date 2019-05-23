const isWall = (width, height, testPosition) =>
  testPosition.x < 0 || testPosition.y < 0 || testPosition.x >= width || testPosition.y >= height;

module.exports = isWall;
