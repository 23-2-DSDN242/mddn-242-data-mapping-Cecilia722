let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile   = "mask_3.png";
let outputFile = "output_3.png";

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

// function makePixelKernel(diameter, is_reverse=false, is_diamond=false) {
//   let kernel = [];
//   let on_value = 1;
//   let off_value = 0;
//   if (is_reverse) {
//     on_value = 0;
//     off_value = 1;
//   }
//   for (let j=0; j<diameter; j++) {
//     let j_center = (diameter-1) / 2;
//     let j_offset = abs(j_center-j);
//     let j_frac = j_offset / j_center;
//     let row = [];
//     kernel.push(row);
//     for (let i=0; i<diameter; i++) {
//       let i_center = (diameter-1) / 2;
//       let i_offset = abs(i_center-i);
//       let i_frac = i_offset / i_center;
//       if (is_diamond) {
//         if (i_frac + j_frac > 1) {
//           row.push(off_value);
//         }
//         else {
//           row.push(on_value);
//         }
//       }
//       else {
//         if ((i_frac*i_frac + j_frac*j_frac) > 1) {
//           row.push(off_value);
//         }
//         else {
//           row.push(on_value);
//         }
//       }
//     }
//   }
//   return kernel;
// }

// let renderCounter=5;
// function draw () {
//   // make kernel
//   is_reverse = true;
//   is_diamond = false;
//   let kernel = makePixelKernel(DIAMETER, is_reverse, is_diamond)

//   let num_lines_to_draw = 40;
//   // get one scanline
//   for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
//     for(let i=5; i<X_STOP; i++) {
//       colorMode(RGB);
//       let pix = [0, 0, 0, 255];
//       let mask = maskImg.get(i, j);
//       if (mask[1] > 128) {
//         pix = sourceImg.get(i, j);
//       }
//       else {
//         let sum_rgb = [0, 0, 0]
//         let num_cells = 0;
//         for(let wx=0;wx<DIAMETER;wx++){
//           for (let wy=0;wy<DIAMETER;wy++) {
//             let kernel_value = kernel[wx][wy];
//             if (kernel_value > 0) {
//               let pix = sourceImg.get(i+wx, j+wy);
//               for(let c=0; c<3; c++) {
//                 sum_rgb[c] += pix[c];
//               }
//               num_cells += 1;              
//             }
//           }
//         }
//         for(let c=0; c<3; c++) {
//           pix[c] = int(sum_rgb[c] / num_cells);
//         }        
//       }

//       set(i, j, pix);
//     }
//   }
//   renderCounter = renderCounter + num_lines_to_draw;
//   updatePixels();

//   // print(renderCounter);
//   if(renderCounter > Y_STOP) {
//     console.log("Done!")
//     noLoop();
//     // uncomment this to save the result
//     // saveArtworkImage(outputFile);
//   }
// }
let ellipse_sizes = ['3', '19', '7', '13'];
let ellipse_size= random(ellipse_sizes); 
let x = floor(random(sourceImg.width));
let y = floor(random(sourceImg.height));
let pix = sourceImg.get(x, y);
let pix_2 = sourceImg.get(x-100, y+10);


function flower(x,y,ellipse_size) {


  push();
  strokeWeight(0);

  rectMode(CENTER)
  

  
  
  ellipse(x+ellipse_size/2,y+ellipse_size/2,ellipse_size)
  ellipse(x+ellipse_size/2,y-ellipse_size/2,ellipse_size)
 ellipse(x-ellipse_size/2,y+ellipse_size/2,ellipse_size)
 ellipse(x-ellipse_size/2,y-ellipse_size/2,ellipse_size)

 
 
 ellipse(x,y,ellipse_size)
  pop();




}

function draw () {

  for(let i=0;i<10000;i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let pix_2 = sourceImg.get(x-100, y+100);
    let mask = maskImg.get(x, y);
    let tex = textImg.get(x, y);
    let col= color(pix)
    let scale = 0.1;
    let ellipse_sizes = ['3', '19', '7', '13'];
    let ellipse_size= random(ellipse_sizes); 
    let random_rotation=random(0,180)
   
    
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

      // set(x,y,new_col);


      set(x, y, pix);
  

      push();
      
      strokeWeight(0.5);

      line(x, y-50, x, y+50);
      ellipse(x,y,ellipse_size)
     
      pop();

   

      push();
     
      rotate(random_rotation)
      fill(177, 199, 148,50)
      ellipse(x,y,ellipse_size*ellipse_size/4)
      ellipse(x,y,ellipse_size*ellipse_size/3)

      // fill(177, 199, 148,100)
      fill(255,255,255,100)
      ellipse(x,y,ellipse_size*ellipse_size/6)


      fill(pix_2,7)
      flower(x,y,ellipse_size)
      pop();

      push();
      fill(118, 215, 81,40)
      rotate(random_rotation)
      flower(x,y,ellipse_size)
      pop();
      
    }
    else {

  
     
      push()
      noStroke()
     
      fill(0,0,0,50)
      rect(x-43, y+6, 57, 3,20);
     
      fill(pix)
      rect(x-50, y, 60, 3,10);
      rect(x-100, y, 3, 60,10);
     

      // fill(255,255,255,30)
      // rect(x-47, y+2, 50, 2,20);
      // pop()

      // push()
      // fill(255,255,255)
      // strokeWeight(2);
      // line(x-50, y, x+50, y);
      // pop()


          

   


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