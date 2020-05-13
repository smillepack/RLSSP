import { 
  arrPentaCoords,
  arrowCoordinatsPenta,
  rBut
} from './consts.js'

import { arrow } from './arrows.js'

export function area() {
    var canvas = document.getElementById('canvas');
    let x = 237,
        y = 273,
        r = 150,
        cos = Math.cos,
        sin = Math.sin,
        anglePlus = Math.PI * 2 / 5,
        angle = 0
      
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');

      // draw penta
      for (let i = 0; i < 5; i++) {
        x -= Math.round(cos(angle) * r)
        y -= Math.round(sin(angle) * r)
        
        angle += anglePlus

        arrPentaCoords.push([x, y])

        // ctx.beginPath()

        // ctx.moveTo(x + rBut, y)
        // ctx.arc(x, y, rBut, 0, Math.PI * 2, true)

        // ctx.stroke()
        // ctx.closePath()      
      }

      ctx.font = '1.2em anton'
      ctx.fillText('Scissors', arrPentaCoords[0][0] - 2.1 * rBut, arrPentaCoords[0][1] + 1.1 * rBut)
      ctx.fillText('Paper',    arrPentaCoords[1][0] - 1 * rBut,   arrPentaCoords[1][1] - 1.1 * rBut)
      ctx.fillText('Paper',    arrPentaCoords[2][0] + 1 * rBut,   arrPentaCoords[2][1] - 0.5 * rBut)
      ctx.fillText('Lizard',   arrPentaCoords[3][0] - 0.5 * rBut, arrPentaCoords[3][1] - 1.1 * rBut)
      ctx.fillText('Spock',    arrPentaCoords[4][0] + 0.8 * rBut, arrPentaCoords[4][1] + 1.1 * rBut)

      // draw arrows
      arrowCoordinatsPenta.forEach((el, index) => {      
        arrow(arrPentaCoords[el[0]][0], arrPentaCoords[el[0]][1], 
              arrPentaCoords[el[1]][0], arrPentaCoords[el[1]][1], ctx, 
              "black")
      })
    }
}