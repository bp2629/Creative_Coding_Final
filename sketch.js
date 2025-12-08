let capture;
let net = null;
let maskGraphics;
let lastSegMs = 0;
let segInterval = 1;
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 



let font
let logo
let b
let a_x
let a_y
let a_time
let a_c
let a_d = 1

let colors  = [[164,220,0],[255,204,0],[150,0,255],[53,68,230]]
let color_index = 0

let frame
let time = 0

let image

function preload(){

  logo = loadImage('applelogo.png');

  font = loadFont("SF-Pro-Display-Medium.ttf")
}


function setup() {
  createCanvas(600, 600);

  textFont(font);
  textSize(32);
  a_time = 0





// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(600, 600);
  capture.hide();

  maskGraphics = createGraphics(600, 600);
  maskGraphics.pixelDensity(1);

  // Load model with .then() instead of async/await
  bodyPix.load().then(function(model) {
    net = model;
    console.log("Model loaded");
  });
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 






}




// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
function runSegmentationOnce() {
  if (!net) return;

  net.segmentPerson(capture.elt, {
    flipHorizontal: true,
    internalResolution: 'medium',
    segmentationThreshold: 0.7
  })
  .then(function(segmentation) {

    const fg = { r: 0, g: 0, b: 0, a: 255 };      // silhouette color
    const bg = { r: 164, g: 222, b: 0, a: 255 }; // background color

    const mask = bodyPix.toMask(segmentation, fg, bg);

    bodyPix.drawMask(
      maskGraphics.elt,  // where to draw the mask
      capture.elt,       // source video
      mask,              // mask
      1.0,               // opacity
      20,                 // blur
      true               // flip horizontal
    );
  });
}
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 












function draw() {

  time += 1
  
  print(time)

  b = 255
  background(250)



  if (time <= 200) {

    image(capture, 0, 0, 600, 600)
  } 
  else if (time == 201) {
    
    frame = capture.get()
  }

  if (time > 201) {
    
    image(frame, 0, 0, width, height)
  }


  





  // animate_arrow(height/2);
  
  // imageMode(CENTER)
  // image(logo,300,300,160,180)
  // strokeWeight(0)
  // text("Hello!", width/2 -40, height/2);

   //run_mask() 
}




function shot_on(image){



}





function animate_arrow(a_y) {
  strokeWeight(0)
  let color = colors[color_index]
  fill(color[0],color[1],color[2])
  rect(0,0,width,height)

  if (a_d== 1) {
    arrow(200)
 
    if (a_x > width + 60) {
     a_d= -1
      a_time = 0
      color_index = (color_index + 1) % colors.length
    }

  } else {
    reverse_arrow(400)

    if (a_x < -60) {
      a_d = 1
      a_time = 0
      color_index = (color_index + 1) % colors.length
    }
  }
}

function arrow(a_y){
  a_time +=1 
  a_x = a_time * 10
  stroke(0)
    fill(0)
    strokeWeight(60)
    line(-50, a_y, a_x + 50, a_y)               
    triangle(a_x + 50, a_y - 5, a_x + 50, a_y + 5, a_x + 60, a_y)
}

function reverse_arrow(a_y){
  a_time +=1 
  a_x = width - (a_time * 10)
  stroke(0)
    fill(0)
    strokeWeight(60)
    line(width, a_y, a_x - 50, a_y);
triangle(a_x - 50, a_y - 5, a_x - 50, a_y + 5, a_x - 60, a_y);
}











function run_mask(){

 

  background(51)

  if (capture.loadedmetadata) {
    image(capture, 0, 0, 600, 600);
  }

  // Run segmentation at intervals
  if (net && millis() - lastSegMs > segInterval) {
    lastSegMs = millis();
    runSegmentationOnce();
  }
  // Draw mask on top
  image(maskGraphics, 0, 0, 600, 600);



}