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
let explosion;
let engine;
let cw;
let ch;
function Canvas7(props) {
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
let screen1;
function sketch(p5) {
  p5.preload = preload(p5);

  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(400, 400);
    screen1 = p5.createGraphics(200, 200, p5.WEBGL);
  };
}
function drawScreen(p5) {
  screen1.push();
  screen1.background("green");
  screen1.imageMode(p5.CENTER);
  screen1.image(
    explosion,
    0,
    0,
    100,
    100,
    (explosion.width / 11) * (Math.floor(p5.frameCount / 8) % 5),
    0,
    explosion.width / 11,
    explosion.height
  );
  // screen1.fill("red");
  // screen1.rectMode(p5.CENTER);
  // screen1.rect(0, 0, 100, 100);
  screen1.pop();
  p5.image(screen1, 0, 0, 200, 200);
}
function draw(p5) {
  return () => {
    p5.background(250, 120, 0);
    drawScreen(p5);

    engine.current.world.bodies.forEach((body) => {
      if (body.label === "starship") {
        p5.push();
        p5.imageMode(p5.CENTER);
        p5.translate(body.position.x, body.position.y);
        p5.rotate(body.angle);
        p5.image(img, 0, 0, img.width * 0.2, img.height * 0.2);
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
  // console.log("img", img);
  // console.log(p5.mouseX, p5.mouseY);
  // console.log(p5);
  console.log("world", engine.current.world);
  if (
    p5.mouseX > p5.canvas.width ||
    p5.mouseY > p5.canvas.height ||
    p5.mouseX < 0 ||
    p5.mouseY < 0
  ) {
    return null;
  }
  const ball = Bodies.circle(p5.mouseX, p5.mouseY, img.width * 0.2 * 0.5, {
    mass: 10,
    restitution: 0.9,
    friction: 0.005,
    label: "starship",
  });
  Composite.add(engine.current.world, [ball]);
}

function preload(p5) {
  // Preload the image
  return () => {
    img = p5.loadImage("./6.png");
    explosion = p5.loadImage("./explosion.png");
  };
}

export default Canvas7;
