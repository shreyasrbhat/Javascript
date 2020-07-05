//variables

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let canvas_offsetx = $(canvas).offset().left
let canvas_offsety = $(canvas).offset().top;

let canvasx = 0
let canvasy = 0

let last_mousex = last_mousey = 0;
let mousex = mousey = 0;
let mousedown = false;
let height = 0;
let width = 0
let crect = null

let img_data = null
let blur_image_data = null

let draw_bounding_box = function(x, y, w, h, ctx){
    //ctx.strokeStyle = 'none';
    //drawRect = ctx.getImageData(x,y,w,h)
    //ctx.putImageData(drawRect, x,y)
    // ctx.rect(x,y,w,h)
    // ctx.stroke()
    
    //ctx.stroke()
    //ctx.drawImage(img, x,y,w,h)
}

const resize_predictions = function(norm_x_top, norm_y_top, norm_x_bottom, norm_y_bottom, orig_w, orig_h){
    const x_top = norm_x_top * orig_w
    const y_top = norm_y_top * orig_h
    const x_bottom = norm_x_bottom * orig_w
    const y_bottom = norm_y_bottom * orig_h
    const width = x_bottom - x_top
    const height = y_bottom - y_top
    console.log([x_top, y_top, width, height])
    return [x_top, y_top, width, height]
    
}
let box_dim = [0.1999, 0.1931, 0.3384, 0.4557, 0.9647, 0.9915, 0.0000]
let img = new Image();
img.onload = function () {
    canvas.width = 683
    canvas.height =  384
    {
        ctx.filter = 'blur(5px)'
        ctx.drawImage(img, 0 ,0,img.width, img.height, 0,0,canvas.width, canvas.height)
        blur_image_data = ctx.getImageData(canvasx,canvasy, canvas.width, canvas.height)
        drawRect = ctx.getImageData(136,74,95,101)
        ctx.filter = 'none'
    }
    ctx.drawImage(img, 0 ,0,img.width, img.height, 0,0,canvas.width, canvas.height);
    const [x_top, y_top, width, height] = resize_predictions(box_dim[0], box_dim[1], box_dim[2], box_dim[3], canvas.width, canvas.height)
    img_data = ctx.getImageData(canvasx,canvasy, canvas.width, canvas.height)
    ctx.putImageData(img_data, 0,0)
    draw_bounding_box(x_top, y_top, width, height, ctx)
    ctx.putImageData(drawRect, x_top,y_top)
}

img.src = 'fp_20200406_102940.png'

$(canvas).on('mousedown', function(e) {
    //img_data = ctx.getImageData(canvasx,canvasy, canvas.width, canvas.height)
    last_mousex = parseInt(e.clientX+document.body.scrollLeft + document.documentElement.scrollLeft);
    last_mousey = parseInt(e.clientY+document.body.scrollTop + document.documentElement.scrollTop);
    //[last_mousex, last_mousey] = getCursorPosition(canvas, e)
    mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    // save the last strock
    img_data = ctx.getImageData(canvasx, canvasy, canvas.width, canvas.height)
    mousedown = false;
});

//Mousemove
$(canvas).on('mousemove', function(e) {
     canvas.style.cursor = 'crosshair'
     mousex = parseInt(e.clientX+document.body.scrollLeft + document.documentElement.scrollLeft);
     mousey = parseInt(e.clientY+document.body.scrollTop + document.documentElement.scrollTop);
    //[mousex, mousey] = getCursorPosition(canvas, e)
     
     if(mousedown) {
        //clear canvas by replacing image saved on last mouseup
       ctx.putImageData(img_data, 0,0)
       ctx.beginPath();
        
        //current box width and height
        width = mousex-last_mousex;
        height = mousey-last_mousey;

        //draw rectangle
        ctx.rect(last_mousex-canvas_offsetx,last_mousey-canvas_offsety,width,height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
        
    }
    $('#output').html('current: '+mousex+', '+mousey+ ` ${e.clientX} ${e.clientY}`+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown+`<br/>dim_h_w: ${height} ${width}`);
    //Output
    
})







