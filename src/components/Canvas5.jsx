import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Bodies,
  Runner,
  Composite,
  Composites,
  Constraint,
  Body,
} from "matter-js";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let isPressed;
let img;
let engine;
let cw;
let ch;
function Canvas5(props) {
  isPressed = useRef(false);
  engine = useRef(Engine.create());

  const [state, setState] = useState(0);

  useEffect(() => {
    cw = 400;
    ch = 400;

    Composite.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(-10, ch / 2, 20, ch, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, {
        isStatic: true,
        label: "wall",
      }),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine.current);

    return () => {
      Runner.stop(runner);
      Composite.clear(engine.current.world, engine.current.world.bodies);
      Composite.remove(engine.current.world, engine.current.world.bodies);
      Engine.clear(engine.current);
    };
  }, []);

  const handleDown = () => {
    console.log(engine.current.world);
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    console.log(e.clientX, e.clientY);
    // if (isPressed.current) {
    if (true) {
      const ball = Bodies.rectangle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        10 + Math.random() * 30,
        {
          // mass: 10,
          // restitution: 0.9,
          // friction: 0.005,
          label: "box",
        }
      );
      Composites.add(engine.current.world, [ball]);
    }
  };

  return (
    <div
    // onMouseDown={handleDown}
    // onMouseUp={handleUp}
    // onMouseMove={handleAddCircle}
    // onClick={handleAddCircle}
    >
      <div style={{ width: 400, height: 400 }}>
        <ReactP5Wrapper sketch={sketch} />
      </div>
      <button onClick={() => setState((prev) => prev + 1)}>click</button>
      <h1>{state}</h1>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(400, 400);
  };
}
function draw(p5) {
  return () => {
    p5.background(250, 120, 0);
    p5.push();
    p5.imageMode(p5.CENTER);
    p5.translate(cw / 2, ch / 2);
    p5.rotate((Math.PI / 4) * Math.floor(p5.frameCount * 0.1));
    p5.image(img, 0, 0, img.width * 0.2, img.height * 0.2);
    p5.pop();
    engine.current.world.bodies.forEach((body) => {
      if (body.label === "box") {
        p5.push();

        p5.fill(255, 0, 0);
        p5.quad(
          body.vertices[0].x,
          body.vertices[0].y,
          body.vertices[1].x,
          body.vertices[1].y,
          body.vertices[2].x,
          body.vertices[2].y,
          body.vertices[3].x,
          body.vertices[3].y
        );
        p5.pop();
      }
      if (body.label === "wall") {
        p5.push();
        p5.rectMode(p5.CENTER);
        p5.fill(body.vertices[0].x, 255, 0);
        p5.quad(
          body.vertices[0].x,
          body.vertices[0].y,
          body.vertices[1].x,
          body.vertices[1].y,
          body.vertices[2].x,
          body.vertices[2].y,
          body.vertices[3].x,
          body.vertices[3].y
        );
        p5.pop();
      }
    });
  };
}
function mousePressed(p5) {
  console.log("img", img);
  console.log(p5.mouseX, p5.mouseY);
  console.log(p5);
  console.log("world", engine.current.world);
  if (
    p5.mouseX > p5.canvas.width ||
    p5.mouseY > p5.canvas.height ||
    p5.mouseX < 0 ||
    p5.mouseY < 0
  ) {
    return null;
  }
  const ball = Bodies.rectangle(p5.mouseX, p5.mouseY, 30, 30, {
    mass: 10,
    restitution: 0.9,
    friction: 0.005,
    label: "box",
  });
  Composite.add(engine.current.world, [ball]);
}

function preload(p5) {
  // Preload the image
  return () => {
    img = p5.loadImage("./6.png");
  };
}

export default Canvas5;
