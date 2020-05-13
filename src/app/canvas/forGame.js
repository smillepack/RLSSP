import { arrow } from './arrows.js'
import { 
  arrPentaCoords,
  arrowCoordinatsPenta,
  elementsIndex,
  rBut
} from './consts.js'

let box

export function sendElements(arr) {
  box = arr
}

export function colorArrow(myChoice, aiChoice, status) {
    var canvas = document.getElementById('canvas')
    let color
  
    if (canvas.getContext) {
      let ctx  = canvas.getContext('2d')
      let from = status == 'win' ? elementsIndex[myChoice] : elementsIndex[aiChoice]
      let to   = status == 'win' ? elementsIndex[aiChoice] : elementsIndex[myChoice]

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 330, 330)

      ctx.font = '1.2em anton'
      ctx.fillStyle = 'black'
      ctx.fillText('Scissors', arrPentaCoords[0][0] - 2.1 * rBut, arrPentaCoords[0][1] + 1.1 * rBut)
      ctx.fillText('Paper',    arrPentaCoords[1][0] - 1 * rBut,   arrPentaCoords[1][1] - 1.1 * rBut)
      ctx.fillText('Rock',    arrPentaCoords[2][0] + 1 * rBut,   arrPentaCoords[2][1] - 0.5 * rBut)
      ctx.fillText('Lizard',   arrPentaCoords[3][0] - 0.5 * rBut, arrPentaCoords[3][1] - 1.1 * rBut)
      ctx.fillText('Spock',    arrPentaCoords[4][0] + 0.8 * rBut, arrPentaCoords[4][1] + 1.1 * rBut)
      
      box.forEach(el =>  el.classList.remove('aiChoice', 'myChoice', 'aiChoiceB'))
      
      if (status == 'win'){
        color = 'green'                
      } else {
        color = 'red'    
      }

      arrowCoordinatsPenta.forEach(el => {
        if (el[0] == from && el[1] == to) {
          arrow(arrPentaCoords[from][0], arrPentaCoords[from][1], 
            arrPentaCoords[to][0], arrPentaCoords[to][1], ctx, color)
        } else {
          arrow(arrPentaCoords[el[0]][0], arrPentaCoords[el[0]][1],
            arrPentaCoords[el[1]][0], arrPentaCoords[el[1]][1], ctx, 'black')
        }        
      })            
    }  

    box.forEach(el => {
      if (status == 'draw') {
        if (el.children[0].alt == myChoice) {
          el.classList.add('myChoice', 'aiChoice')
        }
      } else {
        if (el.children[0].alt == myChoice) {
          el.classList.add('myChoice')
        }
  
        if (el.children[0].alt == aiChoice) {
          el.classList.add('aiChoiceB')
        }
      }
      
    })
  }