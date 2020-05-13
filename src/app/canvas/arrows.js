import { rBut } from './consts.js'

export function arrow(x0,y0,x1,y1, ctx, color = 'black') {
    let dx=x1-x0;
    let dy=y1-y0;
    let angle=Math.atan2(dy,dx);
    let length=Math.sqrt(dx*dx+dy*dy) - rBut;
  
    ctx.beginPath()
  
    ctx.translate(x0,y0);
    ctx.rotate(angle);
    // stroke width = 0
    ctx.lineWidth = 0
    // arrow
    ctx.moveTo(rBut, 0)
    ctx.lineTo(length - 10, 3)
    ctx.lineTo(length - 15 , 10)
    ctx.lineTo(length , 0)
    ctx.lineTo(length - 15, -10)
    ctx.lineTo(length - 10, -3)
    ctx.lineTo(rBut, 0)
    
    ctx.fillStyle = color
    
    ctx.fill()    
    ctx.setTransform(1,0,0,1,0,0);  
    ctx.closePath()
}