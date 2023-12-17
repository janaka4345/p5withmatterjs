import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
import { Engine, Runner, Composite, Bodies } from "matter-js";

let boxA;
let ground;
export default function Canvas2() {
  const scene = useRef();
  const engine = useRef(Engine.create());
  useEffect(() => {
    console.log(Composite);
    const runner = Runner.create();
    // const render = Render.create({
    //   element: scene.current,
    //   engine: engine.current,
    // options: {
    //   width: 600,
    //   height: 400,
    //   wireframes: false,
    //   background: "transparent",
    // },
    // });

    // boundaries
    // create two boxes and a ground
    boxA = Bodies.rectangle(0, 0, 10, 10);
    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    ground = Bodies.rectangle(50, 300, 600, 100, { isStatic: true });

    // // add all of the bodies to the world
    Composite.add(engine.current.world, [boxA, ground]);

    // run the engine
    // Engine.run(engine.current);
    // Render.run(render);
    Runner.run(runner, engine.current);
    // console.log(engine.current.world);
    console.log(ground);

    // unmount
    return () => {
      // destroy Matter
      // Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine.current);
      Composite.remove(engine.current.world, [boxA, ground]);
      // World.clear(engine.current.world);
      // render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      // render.textures = {};
    };
  }, []);
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
    p5.background(0);
    // p5.rect(100, 100, 100, 100);
    p5.rectMode("CENTER");
    p5.rect(boxA.position.x, boxA.position.y, 10, 10);
    p5.rect(ground.position.x, ground.position.y, 600, 100);
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
