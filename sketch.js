let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  // imageMode(CENTER);
  noStroke();
  background(128, 128, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  // image(sourceImg, 0, 0, width, height);
}


function draw () {
  for(let i=0;i<10000;i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    let scale = 0.1;
    let ellipse_sizes = ['3', '19', '7', '13'];
    let ellipse_size= random(ellipse_sizes); 
    // if(mask[0] > 128) {
    //   scale = 0.5;
    // }
    // else {
    //   scale = 0.1;
    // }
    fill(pix);
    stroke(pix);
    let pointSize = 20;
    if(mask[0] > 128) {
      strokeWeight(1);
      line(x, y-50, x, y+50);
      ellipse(x,y,ellipse_size)
    }
    else {
     
      push()
      noStroke()
      fill(0,0,0,50)
      rect(x-43, y+6, 57, 3,20);


     
      fill(pix)
      rect(x-50, y, 60, 3,10);
     
      
      

      fill(255,255,255,30)
      rect(x-47, y+2, 50, 2,20);
      pop()

      push()
      fill(pix)
      strokeWeight(2);
      line(x-50, y, x+50, y);
      pop()
    }

    // ellipse(x, y, pointSize, pointSize);
    // owl(x, y, pix[1], scale);
  }
  renderCounter = renderCounter + 1;
  if(renderCounter > 10) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}