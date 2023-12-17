import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";

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
  };
}

function draw(p5) {
  return () => {
    p5.background(255, 0, 0);
    p5.rect(100, 100, 100, 100);
  };
}

function preload(p5) {
  // Preload the image
  return () => {
    // img = p5.loadImage("./shadow_dog.png");
  };
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}
