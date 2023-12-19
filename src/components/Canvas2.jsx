import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
import { Engine, Runner, World, Bodies } from "matter-js";
import { boxy } from "../objects/box";

let boxA;
// let ground;
let boxBodyArray;
let engine;
export default function Canvas2() {
  boxBodyArray = useRef([]);
  // const scene = useRef();
  engine = useRef(Engine.create());
  useEffect(() => {
    const runner = Runner.create();

    // boundaries
    // create two boxes and a ground

    // boxA = Bodies.rectangle(200, 100, 80, 80);

    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    // ground = Bodies.rectangle(0, 250, 200, 100, { isStatic: true });

    // // add all of the bodies to the world
    // Composite.add(engine.current.world, [boxA]);
    // World.add(engine.current.world, [boxA]);

    // run the engine
    // Engine.run(engine.current);
    // Render.run(render);
    Runner.run(runner, engine.current);

    // unmount
    return () => {
      // destroy Matter
      // Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine.current);
      World.remove(engine.current.world, []);
      World.clear(engine.current.world);
      // render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      // render.textures = {};
    };
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      <div style={{ width: 400, height: 400 }}>
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </>
  );
}
function setup(p5) {
  return () => {
    p5.createCanvas(400, 400);
  };
}

function draw(p5) {
  return () => {
    p5.background(0);
    // p5.rect(100, 100, 100, 100);
    // p5.rectMode("CENTER");
    // p5.fill(255, 204, 0);
    // p5.rect(0, 0, 80, 80);
    if (boxBodyArray.current) {
      boxBodyArray.current.forEach((box, i) => {
        console.log(
          boxBodyArray.current[i].position.x,
          boxBodyArray.current[i].position.y,
        );
        boxy(
          p5,
          boxBodyArray.current[i].position.x,
          boxBodyArray.current[i].position.y,
          20,
          20,
        );
      });
    }
    // p5.rect(ground.position.x, ground.position.y, 50, 50);

    // p5.noLoop();
  };
}

function preload(p5) {
  // Preload the image
  return () => {
    // img = p5.loadImage("./checker.jpg");
  };
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function mousePressed(p5) {
  const box = Bodies.rectangle(p5.mouseX, p5.mouseY, 80, 80);
  boxBodyArray.current.push(box);
  console.log("b", boxBodyArray);
  World.add(
    engine.current.world,
    boxBodyArray.current[boxBodyArray.current.length - 1],
  );
}
