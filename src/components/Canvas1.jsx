import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
let img;
let spriteWidth;
let spriteHeight;

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
  return () => {
    console.log(spriteWidth, spriteHeight);
    p5.background(0);
    // p5.rect(100, 100, 100, 100);
    p5.image(
      img,
      p5.width / 2,
      p5.height / 2,
      spriteWidth,
      spriteHeight,
      spriteWidth * 2,
      spriteHeight * 0,
      spriteWidth,
      spriteHeight,
    );
    // p5.imageMode(CENTER);
    p5.noLoop();
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
