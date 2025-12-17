// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 

let capture; //variable to create capture 
let net = null; // holds the sillohoute body 
let maskGraphics; // variable that allows to draw/compute the mask, before drawing it on the screen
let lastSegMs = 0; // when to start the reload cycle(at the begining )
let segInterval = 1; // minimum time between when the mask updates. 

// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 

//ACT 1 Variables 
let font  
let logo
let a_x // arrow x 
let a_y // arrow y
let a_time = 0 // arrow internal timer
let a_d = 1 //arrow direction
let colors  = [[164,220,0],[255,204,0],[150,0,255],[53,68,230]] //array of colors (green, blue, yellow, purple)
let color_index = 0   //index for above. 


let time = 0 // general time for program
let canvas // program canvas
 

//ACT 2 
let frame // frame to take screenshot 
let snapshot // screenshot data / image 
let shot_time = 0 //interal timer for 2nd act. 
let phone_number = 1  // variable holding # to grow exponentially. 



// Act 3 
let arm  = 190 //base arm length. 
let a_out = arm + 25 // elongated arm. 
let s_counter = 1 // internal timer for act 3 

function preload(){

  logo = loadImage('applelogo.png') //load images 
  steve = loadImage('stevejobs.png')
  ewaste1 = loadImage('ewaste1.jpg')
  ewaste2= loadImage('ewaste2.jpeg')
  ewaste3= loadImage('ewaste3.jpeg')
  ewaste4= loadImage('ewaste4.jpeg')

  font = loadFont("SF-Pro-Display-Medium.ttf") // load font 
}


function setup() {
  canvas = createCanvas(600, 600); 
  canvas.position((windowWidth - width) / 2,(windowHeight - height) / 2) // center canvas on screen. 
  

  textFont(font); //text set up. 
  textSize(32);
  textAlign(CENTER, CENTER)

  noCursor() // No cursor
  frameRate(30) // Uniform timing. 





// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
  pixelDensity(1); // Alligns the mask with the canvas, so the operate on the same basis --> one pixel on the screen = 1 pixel on the mask. 
  capture = createCapture(VIDEO); // Start taking video
  capture.size(600, 600); // 600 x 600 video 
  capture.hide(); // Don't show the video, so we can show the mask. 

  maskGraphics = createGraphics(600, 600); // sub canvas for the mask. 
  maskGraphics.pixelDensity(1); // 1:1 pixels 

  // Load model with .then() instead of async/await
  bodyPix.load().then(function(model) {   // Load the mask, then once bodyPix says that it is ready, show us the mask/graphic that we stored, 
    net = model; // This keeps track of the mask so we can use it again. 
    console.log("Model loaded"); // trouble shooting line to make sure that this part is working(because otherwise no mask)
  });
}

function runSegmentationOnce() {
  if (!net) return; // if it is not loaded, this will be false, and say to do not run it. 

  net.segmentPerson(capture.elt, { // Where body pix distinguishes the body from the background in the frame. 
    flipHorizontal: true,  // mirror the image. 
    internalResolution: 'medium',  // resoultion of the mask 
    segmentationThreshold: 0.7 // determines how picky the mask is in selecting the body. 
  })
  .then(function(segmentation) { // once that selection is made, we can tell it to make the mask. 

    const fg = { r: 0, g: 0, b: 0, a: 255 };      // silhouette color
    const bg = { r: 164, g: 222, b: 0, a: 255 }; // background color

    const mask = bodyPix.toMask(segmentation, fg, bg); // where sillihoute pixels become silhouette pixels and background pixels become background pixels. 

    bodyPix.drawMask( // defining the settings of the mask
      maskGraphics.elt,  // where to draw the mask (which canvas)
      capture.elt,       // source video
      mask,              // mask
      1.0,               // opacity
      20,                // blur
      true               // flip horizontal
    );
  });
}
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 



function draw() {


  time += 1 
  print(time) // for debugging. 


  background(250) //off white. 
  if (time <=1872){  animate_arrow()} // Runs arrow beneath all of first act. 

  if (time <= 134){
    image(logo,width/2 -40,height/2 -45,80,90) // Shows logo while user allows camera use. 
  }


  else if (time <= 264){ //Start Text here 
    strokeWeight(0)
    text("hello!", width/2 , height/2) 
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
  else if (time <=612){ // First Mask 
    run_mask()
  }
  else if (time <=700){ //Continue Text 

    strokeWeight(0)
    text("that was great!", width/2 , height/2)

    
  }
  else if (time <=768){
    strokeWeight(0)
    text("lets go again!", width/2 , height/2)

    
  }
  else if (time <=836){ // Mask 
    run_mask()    
  }
  else if (time <=904){ // Mask + Text 

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
  else if (time <=1335){ // Just Text again 
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
  else if (time <=1736){ // Mask 
    run_mask()
   
 
    
  }


  // ACT 2
  else if (time <=1872){


   image(capture, 0, 0, 600, 600) // show webcam
 
    
  }

  else if (time <=1940){ //webcam + text. 
   
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
   else if (time ==2021){ //screen shot 
    frame = capture.get()
  
     
   }
   else if (time > 2021) {

      shot_on(frame) // cropped/ adjust screenshot, Then number animation
    
    }

    //ACT 3
    if (time >=3000){

      steve_job() // outro animation
    }
    
  
}


  function shot_on(snapshot) {
    let size = 400 
    shot_time += 1
  
    if (shot_time <= 80) { // for first 80 frames, show just the screen shot, centered and smaller. 
      background(255)
      imageMode(CENTER)
      image(snapshot, width/2, height/2, size, size)
    }
  
    else if (shot_time <= 80) { // switch to text. 
  
      fill(0)
      text("Shot on iPhone " + phone_number, width/2 , height/2) //  'iPhone 1'
    }
    else if (shot_time <= 1000) {
  
      phone_number = floor(pow(1.01, shot_time -79)); // Exponentially increase iPhone #
      fill(0)
      text("Shot on iPhone " + phone_number, width/2 , height/2)
    }
  



}


function steve_job(){
  imageMode(CORNER) // For Images in slide show/ Steve jobs head -- Setup below 
  s_counter += 1 
  fill(180)
  strokeWeight(0)
  rectMode(CORNER)
  ellipseMode(CENTER)

  //background
  fill(180);
  rect(0, 0, 600, 600)

  //screen

  let screen_cycle = 120 // Cycle between images and text. 
  fill(100);
  rect(240, 50, 350, 350)


  let slideshow = [ewaste1, ewaste2, ewaste3, ewaste4] // Array of e-waste pictures. 
  if ((s_counter % (screen_cycle * 2)) < screen_cycle) { // allows the screen to switch between showing the sub slideshow of images, and the text in equal lengths
    let slideshow_index = floor((s_counter % screen_cycle) / 30)  // Faster 30 frame rotation of images that continue fit inside the time between text and image.  (120/4 =30)
  slideshow_index = slideshow_index % slideshow.length  //  ++ Without out it contining the entire time and getting off cycle.

  image(slideshow[slideshow_index], 270, 110, 300, 225); // makes images same size. 
    
  } else { // Swap between text and slideshow. 

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

 

  // Head 
  let jobs_offset = 140 // to offset entire character. 
  image(steve,62,110,200,200)

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

  if ((s_counter % (arm_cycle * 2)) < arm_cycle) { // similiar to slideshow logic above. Switch between the long and short arm rectangles being drawn. 
    
    rect(arm, 280, 40, 10) // arm in 
  } else {
    
    rect(a_out, 280, 40, 10) // arm out 
  }
  
}







function animate_arrow() { // cycle colors and arrows 
  strokeWeight(0)
  let color = colors[color_index] // start with the first color. 
  fill(color[0],color[1],color[2]) 
  rect(0,0,width,height) // rectangle instead of background to get it simplier. 

  if (a_d== 1) { // start with first arrow going forward. 
    arrow(200) // run arrow. 
    if (a_x > width + 60) { // once it goes past the edge, allow for reverse arrow to go. 
     a_d= -1
      a_time = 0
      color_index = (color_index + 1) % colors.length // swtich to next color in the array at the same time. 
    }

  } else {
    reverse_arrow(400) // reverse of above. 

    if (a_x < -60) {
      a_d = 1
      a_time = 0
      color_index = (color_index + 1) % colors.length
    }
  }
}

function arrow(a_y){ // iniital forwards arrow. 
  a_time +=1 //time 
  a_x = a_time * 10 // adjust speed. 
  stroke(0)
    fill(0)
    strokeWeight(60)
    line(-50, a_y, a_x + 50, a_y)   // draw a line of growing length.              
    triangle(a_x + 50, a_y - 5, a_x + 50, a_y + 5, a_x + 60, a_y) // arrow head. 
}

function reverse_arrow(a_y){ //second backwards arrow.
  a_time +=1  //time
  a_x = width - (a_time * 10)// speed
  stroke(0)
    fill(0)
    strokeWeight(60)
    line(width, a_y, a_x - 50, a_y) // line
triangle(a_x - 50, a_y - 5, a_x - 50, a_y + 5, a_x - 60, a_y)//head
}


function run_mask(){ // my own function to seperate mask code from draw loop. 

 // MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 

  background(51)

  if (capture.loadedmetadata) { // checks for when the camera is started
    image(capture, 0, 0, 600, 600); //draws the webcam. 
  }


  if (net && millis() - lastSegMs > segInterval) { // if bodyPix is ready, and enough time has passed since the last load cycle of the mask. 
    lastSegMs = millis(); //mark the time so we can figure out the timing of the next cycle. 
    runSegmentationOnce(); // then update the mask. 
  }
 
  image(maskGraphics, 0, 0, 600, 600); // draw the mask. 

// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 
// MASK MASK MASK MASK MASK MASK MASK MASK MASK MASK 

}