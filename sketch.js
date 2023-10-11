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
  textImg = loadImage("texture.png");
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(255,255,255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  textImg.loadPixels();
  // image(sourceImg, 0, 0, width, height);
}

let X_STOP = 640;
let Y_STOP = 480;

function draw () {



  for(let i=0;i<10000;i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    let tex = textImg.get(x, y);
    let col= color(pix)
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
    
    let pointSize = 20;
    if(mask[0] > 128) {

      
      let new_col= [0,0,0,255];
      for(let k=0; k<3; k++){
        new_col[k]=map (100,0,100,pix[k], tex[k]);
      }

      set(x,y,new_col);


      set(x, y, pix);
      
      push();
      
      strokeWeight(1.5);
      line(x, y-50, x, y+50);
      ellipse(x,y,ellipse_size)
      pop();
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