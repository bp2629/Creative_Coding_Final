let capture;
let net = null;
let maskGraphics;
let lastSegMs = 0;
let segInterval = 150;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);

  capture = createCapture(VIDEO);
  capture.size(600, 600);
  capture.hide();

  maskGraphics = createGraphics(600, 600);
  maskGraphics.pixelDensity(1);

  // Load model with .then() instead of async/await
  bodyPix.load().then(function(model) {
    net = model;
    console.log("Model loaded!");
  });
}

function runSegmentationOnce() {
  if (!net) return;

  net.segmentPerson(capture.elt, {
    flipHorizontal: true,
    internalResolution: 'medium',
    segmentationThreshold: 0.7
  })
  .then(function(segmentation) {

    const fg = { r: 0, g: 0, b: 0, a: 255 };      // silhouette color
    const bg = { r: 255, g: 255, b: 255, a: 255 }; // background color

    const mask = bodyPix.toMask(segmentation, fg, bg);

    bodyPix.drawMask(
      maskGraphics.elt,  // where to draw the mask
      capture.elt,       // source video
      mask,              // mask
      1.0,               // opacity
      0,                 // blur
      true               // flip horizontal
    );
  });
}

function draw() {
  background(51);

  image(capture, 0, 0, 600, 600);

  // Run segmentation at intervals
  if (millis() - lastSegMs > segInterval) {
    lastSegMs = millis();
    runSegmentationOnce(); // no async
  }

  // Draw mask on top
  image(maskGraphics, 0, 0, 600, 600);
}
