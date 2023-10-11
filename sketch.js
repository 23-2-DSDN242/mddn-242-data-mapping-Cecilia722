let sourceImg = null;
let maskImg = null;
let renderCounter = 0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile = "mask_3.png";
let outputFile = "output_3.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
  textImg = loadImage("texture.png");
}

function setup() {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 0);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  textImg.loadPixels();
}

let X_STOP = 640;
let Y_STOP = 480;






// this defines what my glowing flowers look like
function flower(x, y, ellipse_size) {
  let pix = sourceImg.get(x, y);
  push();
  strokeWeight(0);
  rectMode(CENTER)
  ellipse(x + ellipse_size / 2, y + ellipse_size / 2, ellipse_size)
  ellipse(x + ellipse_size / 2, y - ellipse_size / 2, ellipse_size)
  ellipse(x - ellipse_size / 2, y + ellipse_size / 2, ellipse_size)
  ellipse(x - ellipse_size / 2, y - ellipse_size / 2, ellipse_size)
  fill(pix[0], pix[1], pix[2], 50)
  ellipse(x, y, ellipse_size)
  pop();


}

function draw() {

  for (let i = 0; i < 10000; i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let pix_2 = sourceImg.get(x - 100, y + 100);
    let pix_3 = sourceImg.get(x - 500, y - 500);
    let mask = maskImg.get(x, y);
    let tex = textImg.get(x, y);
    let col = color(pix)
    let scale = 0.1;
    let ellipse_sizes = ['3', '19', '7', '13'];
    let ellipse_size = random(ellipse_sizes);
    let random_rotation = random(0, 180)


    fill(pix);

    let pointSize = 20;
    if (mask[0] > 128) {


      let new_col = [0, 0, 0, 255];
      for (let k = 0; k < 3; k++) {
        new_col[k] = map(100, 0, 100, pix[k], tex[k]);
      }

      // draw bulr ellipse
      set(x, y, pix);
      push();
      strokeWeight(0.5);
      line(x, y - 50, x, y + 50);
      ellipse(x, y, ellipse_size / 18 * ellipse_size)
      fill(pix[0], pix[1], pix[2], 100)
      ellipse(x, y, ellipse_size / 12 * ellipse_size)
      pop();

      //  draw glowing flowers
      push();
      rotate(random_rotation)
      fill(pix[0], pix[1], pix[2], 100)
      ellipse(x, y, ellipse_size * ellipse_size / 4)
      fill(pix_2[0], pix_2[1], pix_2[2], 100)
      ellipse(x, y, ellipse_size * ellipse_size / 3)
      fill(pix[0], pix[1], pix[2], 100)
      ellipse(x, y, ellipse_size * ellipse_size / 6)
      fill(pix_2, 7)
      flower(x, y, ellipse_size)
      pop();


      //draw glowing flower color adj. to make the final color cleaner
      push();
      strokeWeight(1.5)
      stroke(255, 255, 255)
      fill(pix[0], pix[1], pix[2], 20)
      rotate(random_rotation)
      flower(x, y, ellipse_size)
      pop();


    } else {


      //  draw stitches
      push()
      noStroke()
      fill(0, 0, 0, 50)
      rect(x - 43, y + 6, 57, 3, 20);
      fill(pix)
      rect(x - 30, y, 60, 3, 10);
      rect(x, y - 30, 3, 60, 10);
      pop()

    //  draw yellow sparks
      fill(255, 255, 179, 200)
      ellipse(x + ellipse_size, y - ellipse_size, ellipse_size * ellipse_size / 20)


    }

   
  }
  renderCounter = renderCounter + 1;
  if (renderCounter > 10) {
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