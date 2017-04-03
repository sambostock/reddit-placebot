const bmp = require('bmp-js')
const config = require('../config')
const colors = require('./colors')
const closestColor = require('./closest_color')

// Takes the 2 buffers and returns a list of
// valid colors changes to make

let HEIGHT = 1000
let WIDTH = 1000
let TRANSPARENT = 0xff00ffff

module.exports = function (rawBoardBuffer, rawTargetBuffer) {
  let targetBuffer = bmp.decode(rawTargetBuffer).data
  let boardBuffer = bmp.decode(rawBoardBuffer).data

  let actions = []
  let len = targetBuffer.byteLength
  for (let i = 0; i < len-4; i += 4) {
    let val = targetBuffer.readUIntBE(i, 4)
    if (val !== TRANSPARENT) {
      let boardVal = boardBuffer.readUIntBE(i, 4)
      if (boardVal !== val) {
        let n = (i/4)
        let x = n % 1000
        let y = Math.floor(n / 1000)
        let color = colors.byInt.indexOf(val)
        if (color === -1) {
          console.warn(`WARNING: Unknown color #${val.toString(16)} at X: ${x} Y: ${y}`)
          if (config.useClosestColor) {
            color = closestColor(val);
            console.warn(`Closest match to #${val.toString(16)} is #${colors.byInt[color].toString(16)}`)
          }
        }
        if (color !== -1) {
          actions.push({ x: x, y: y, color: color })
        }
      }
    }
  }

  shuffle(actions)
  return actions
}

// http://stackoverflow.com/a/6274381/1011428
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
