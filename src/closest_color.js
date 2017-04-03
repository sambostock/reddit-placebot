const Jimp = require('jimp')
const colors = require('./colors')

function intToRGBA(color) {
  return Jimp.intToRGBA(color)
}

function distance(c1, c2) {
  const [r1, g1, b1] = c1;
  const [r2, g2, b2] = c2;
  return Math.sqrt(
    Math.pow((r1 - r2), 2) + Math.pow((g1 - g2), 2) + Math.pow((b1 - b2), 2)
  )
}

// Returns index in color table of closest color
module.exports = function findClosest(intColor) {
  const rgba = Jimp.intToRGBA(intColor);
  const color = [rgba.r, rgba.g, rgba.b];

  const closestColor = colors.byHex.map(target => ({
    color: target,
    distance: distance(target, color)
  })).reduce((previous, current) =>
    previous.distance < current.distance ? previous : current
  ).color;

  return colors.byHex.indexOf(closestColor);
}
