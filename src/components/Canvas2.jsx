import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
import { Engine, Runner, World, Bodies } from "matter-js";
import { boxy } from "../objects/box";

let boxA;
// let ground;
let engine;
export default function Canvas2() {
  // const scene = useRef();
  engine = useRef(Engine.create());
  useEffect(() => {
    // console.log("useeffectran");
    // console.log(Composite);
    const runner = Runner.create();
    // const render = Render.create({
    //   element: scene.current,
    //   engine: engine.current,
    //   options: {
    //     width: 600,
    //     height: 400,
    //     wireframes: false,
    //     background: "red",
    //   },
    // });

    // boundaries
    // create two boxes and a ground

    boxA = Bodies.rectangle(200, 100, 80, 80);
    // blockA = new Block(world, { x: 200, y: 200, w: 80, h: 80, color: "white" });
    // blockB = new Block(world, { x: 270, y: 50, w: 160, h: 80, color: "white" });
    // ground = new Block(world, { x: 400, y: 500, w: 810, h: 15, color: 'grey' }, { isStatic: true, angle: PI/36 });

    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    // ground = Bodies.rectangle(0, 250, 200, 100, { isStatic: true });

    // // add all of the bodies to the world
    // Composite.add(engine.current.world, [boxA]);
    World.add(engine.current.world, [boxA]);

    // run the engine
    // Engine.run(engine.current);
    // Render.run(render);
    Runner.run(runner, engine.current);
    // console.log("kl");
    // console.log("world", engine.current.world);
    // console.log("box", boxA);

    // unmount
    return () => {
      // destroy Matter
      // Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine.current);
      World.remove(engine.current.world, [boxA]);
      World.clear(engine.current.world);
      // render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      // render.textures = {};
    };
  }, []);
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
    // console.log(boxA.position.x, boxA.position.y);
    p5.background(0);

    // p5.rect(100, 100, 100, 100);
    // p5.rectMode("CENTER");
    // p5.fill(255, 204, 0);
    // p5.rect(0, 0, 80, 80);
    boxy(p5, boxA.position.x, boxA.position.y, 80, 80);
    // p5.rect(0, 250, 100, 100);
    // p5.fill(255, 204, 0);
    // p5.rect(ground.position.x, ground.position.y, 50, 50);
    // p5.fill(255, 0, 0);
    // p5.fillColor("red");
    // p5.imageMode(CENTER);
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
}
