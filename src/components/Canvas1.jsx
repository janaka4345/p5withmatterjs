import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
let img;
let spriteWidth;
let spriteHeight;
//understtand how sprite images should work
export default function Canvas1() {
  // useEffect(() => {
  // }, []);
  return (
    <>
      <ReactP5Wrapper sketch={sketch} />;
    </>
  );
}
function setup(p5) {
  return () => {
    p5.createCanvas(600, 400);
    spriteWidth = img.width / 8;
    spriteHeight = img.height / 8;
  };
}

function draw(p5) {
  let x = 0;
  return () => {
    console.log(spriteWidth, spriteHeight);
    p5.background(0);
    // p5.rect(100, 100, 100, 100);
    p5.image(
      img,
      p5.width / 2 - spriteWidth / 2, //display at the center of the canvas
      p5.height / 2 - spriteHeight / 2,
      spriteWidth, //display image with height
      spriteHeight,
      spriteWidth * (Math.floor(p5.frameCount / 10) % 7), // x,y location of the portion needed on the image // multiply by number to got a frame and adding numbers toslide
      spriteHeight * 1,
      spriteWidth * 1, //images size on the actual image
      spriteHeight * 1,
    );
    // p5.imageMode(CENTER);
    // p5.noLoop();
  };
}

function preload(p5) {
  // Preload the image
  return () => {
    img = p5.loadImage("./checker.jpg");
  };
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}
