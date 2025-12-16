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
let time = 1800

let snapshot
let shot_time = 0
let phone_number = 1
let canvas

let arm  = 190
let a_in  = arm
let a_out = arm + 25
let s_counter = 1

function preload(){

  logo = loadImage('applelogo.png');

  steve = loadImage('stevejobs.png')

  ewaste1 = loadImage('ewaste1.jpg')
  ewaste2= loadImage('ewaste2.jpeg')
  ewaste3= loadImage('ewaste3.jpeg')
  ewaste4= loadImage('ewaste4.jpeg')

  font = loadFont("SF-Pro-Display-Medium.ttf")
}


function setup() {
  canvas = createCanvas(600, 600);
  canvas.position((windowWidth - width) / 2,(windowHeight - height) / 2)
  

  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER)
  a_time = 0
  noCursor()
  frameRate(30)





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

  if (time <=1872){  animate_arrow()}

  

  if (time <= 134){

  
    image(logo,240,245,80,90)

    
  }
  else if (time <= 198){
    strokeWeight(0)
    text("hello!", width/2 , height/2)


  }
  else if (time <= 264){
    strokeWeight(0)
    text("hello!", width/2 , height/2)

    
  }
  else if (time <= 334){

    strokeWeight(0)
    text("Are you ready to dance?!", width/2 , height/2)

    
  }
  else if (time <= 396){
    strokeWeight(0)
    text("Are you ready to dance?!", width/2 , height/2)

    
  }
  else if (time <= 466){
    strokeWeight(0)
    text("Get ready!", width/2 , height/2)
    

    
  }
  else if (time <= 540){
    strokeWeight(0)
    text("dance!", width/2 , height/2)


    
  }
  else if (time <=612){
    run_mask()
  }
  else if (time <=700){

    strokeWeight(0)
    text("that was great!", width/2 , height/2)

    
  }
  else if (time <=768){
    strokeWeight(0)
    text("lets go again!", width/2 , height/2)

    
  }
  else if (time <=836){

  
    run_mask()

    
  }
  else if (time <=904){



    run_mask()
    strokeWeight(0)
  
    text("oh, by the way", width/2 , 50)


    
  }
  else if (time <=1040){



    run_mask()
    strokeWeight(0)
    
    text("did you know that roughly 5.3 billion", width/2 , 50)
    text("phones are expected to go to waste", width/2 , 80)
    text("at the end of this year.", width/2 , 110)
  }
  else if (time <=1176){

    run_mask()
    strokeWeight(0)
    text("and a new phone is responsible for around ", width/2 , 50)
    text("190 pounds of carbon emission", width/2 , 80)

    

  }
  else if (time <=1335){
    strokeWeight(0)
    text("And that iPhones contain toxic ", width/2 , height/2)
    text("materials such as", width/2  , height/2 +30)
    
  }
  else if (time <=1471){
   
    strokeWeight(0)
    text("lead, mercury, cadmium,", width/2 , height/2)
    text("arsenic, chromium, and flame retardants", width/2  , height/2 +30)

  }
  else if (time <=1600){
   
    strokeWeight(0)
    text("that totally suck for the enviornment! ", width/2 , height/2)

  }
  else if (time <=1668){
    strokeWeight(0)
    text("c'mon keep dancing!", width/2 , height/2)

    
  }
  else if (time <=1736){
    run_mask()
   
 
    
  }

  else if (time <=1872){


   image(capture, 0, 0, 600, 600)
 
    
  }

  else if (time <=1940){
  
    image(capture, 0, 0, 600, 600)
    strokeWeight(0)
    fill(0)
    text("how does that make you feel?", width/2 , 50)
     
   }
   else if (time <=1990){
    image(capture, 0, 0, 600, 600)
    strokeWeight(0)
    fill(0)
    text("show us!", width/2 , 50)
   
  
     
   }
   else if (time <=2000){
    image(capture, 0, 0, 600, 600)
    strokeWeight(0)
    fill(0)
    text("in 3", width/2 , 50)
    
  
     
   }
   else if (time <=2010){
    image(capture, 0, 0, 600, 600)
    strokeWeight(0)
    fill(0)
    text("in 2", width/2 , 50)
  
  
     
   }
   else if (time <=2020){
    image(capture, 0, 0, 600, 600)
    strokeWeight(0)
    fill(0)
    text("in 1", width/2 , 50)
 
  
     
   }
   else if (time ==2021){
    frame = capture.get()
  
     
   }
   else if (time > 2021) {

      shot_on(frame)
    
    }

    if (time >=3000){

      steve_job()
    }
    
    











  //steve_job()



  // if (time <= 200) {

  //   image(capture, 0, 0, 600, 600)
  // } 
  // else if (time == 201) {
    
  //   frame = capture.get()
  // }

  // if (time > 201) {

  //   shot_on(frame)
  
  // }

  





  // animate_arrow(height/2);
  
  // imageMode(CENTER)
  // image(logo,300,300,160,180)
  // strokeWeight(0)
  // text("Hello!", width/2 -40, height/2);

   //run_mask() 
}


  function shot_on(snapshot) {
    let size = 600
    shot_time += 1
  
    if (shot_time <= 80) {
      background(255)
      size = 400
      imageMode(CENTER)
      image(snapshot, width/2, height/2, size, size)
    }
  
    else if (shot_time <= 80) {
  
      fill(0)
      text("Shot on iPhone " + phone_number, width/2 , height/2);
    }
    else if (shot_time <= 1000) {
  
      phone_number = floor(pow(1.01, shot_time -79));
      fill(0)
      text("Shot on iPhone " + phone_number, width/2 , height/2);
    }
  



}


function steve_job(){
  imageMode(CORNER)

  s_counter += 1 

  fill(180)
  strokeWeight(0)
  rectMode(CORNER)
  
  ellipseMode(CENTER)

        
  

  //background
  fill(180);
  rect(0, 0, 600, 600)

  //screen



  let screen_cycle = 120


  fill(100);
  rect(240, 50, 350, 350)

  let slideshow = [ewaste1, ewaste2, ewaste3, ewaste4]
  if ((s_counter % (screen_cycle * 2)) < screen_cycle) {

    let slideshow_index = floor((s_counter % screen_cycle) / 30)
  slideshow_index = slideshow_index % slideshow.length;  

  image(slideshow[slideshow_index], 270, 110, 300, 225);
    
    // image(ewaste1,270,110,300,225)
    // image(ewaste2,270,110,300,225)
    // image(ewaste3,240,110,350,225)
    // image(ewaste4,240,110,350,225)
  } else {
    
  fill(255)
  strokeWeight(0)
  text("introducing:", 410 , 150)
  text("iPhone 18", 410 ,220)
  text("Buy NOW!", 410 , 310)
  }


  

  //stage
  fill(0);
 
  rect(0, 400, 600, 100)

 //podium
  fill(139, 69, 19)
  rect(50, 300, 40, 100)

  let jobs_offset = 140

  // Head 
  image(steve,62,110,200,200)
  // fill(255,240,184) 
  // stroke(240)
  // ellipse(jobs_offset + 25, 255, 30, 30)

  //body 
  fill(0)
  rect(jobs_offset, 280, 50, 70)
  //Turtle neck 
  rect(jobs_offset + 15, 270, 20, 25)

  // Left Leg 
  fill(150, 180, 255)
  rect(jobs_offset + 5, 350, 15, 50)

  // Right Leg 
  fill(150, 180, 255)
  rect(jobs_offset + 30, 350, 15, 50)

  // Left Foot 
  fill(255)
  
  rect(jobs_offset , 400, 20, 10)

  // Right Foot 
  fill(255)
  rect(jobs_offset + 30, 400, 20, 10)

  // Left Arm 
  fill(0);
  rect(jobs_offset - 10, 280, 10, 50)

  // right arm
  fill(0)

  let arm_cycle = 10

  rect(arm, 280, 40, 10)
  if ((s_counter % (arm_cycle * 2)) < arm_cycle) {
    
    rect(arm, 280, 40, 10);
  } else {
    
    rect(a_out, 280, 40, 10);
  }
  

  

  // Eyes 
  // fill(25)
  // ellipse(jobs_offset+ 25, 250, 6, 6)
  // ellipse(jobs_offset+35, 250, 6, 6)
}







function animate_arrow() {
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