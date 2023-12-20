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
let engine;
function Canvas4(props) {
  isPressed = useRef(false);
  engine = useRef(Engine.create());

  const [state, setState] = useState(0);

  useEffect(() => {
    const cw = 400;
    const ch = 400;
    // const boxA = Bodies.rectangle(cw / 2, 10, 10, 10, {
    //   // mass: 10,
    //   // restitution: 0.9,
    //   // friction: 0.005,
    //   label: "boxx",
    // });
    // const boxB = Bodies.rectangle(cw / 2, 30, 10, 10, {
    //   // mass: 10,
    //   // restitution: 0.9,
    //   // friction: 0.005,
    //   label: "boxx",
    // });
    // Composite.add(
    //   engine.current.world,
    //   Constraint.create({
    //     bodyA: boxA,
    //     bodyB: boxB,
    //     length: 50,
    //     stiffness: 0.4,
    //   })
    // );
    var group = Body.nextGroup(true);

    var ropeA = Composites.stack(100, 0, 8, 1, 10, 10, (x, y) => {
      return Bodies.rectangle(x, y, 20, 20, {
        // collisionFilter: { group: group },
      });
    });

    Composites.chain(ropeA, 1, 0, -1, 0, {
      stiffness: 0.8,
      length: 2,
      // render: { type: "line" },
    });
    Composite.add(
      ropeA,
      Constraint.create({
        bodyB: ropeA.bodies[0],
        pointB: { x: -25, y: 0 },
        pointA: {
          x: ropeA.bodies[0].position.x,
          y: ropeA.bodies[0].position.y,
        },
        stiffness: 0.5,
      })
    );
    Composite.add(engine.current.world, [ropeA]);
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

    //constraints

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
  // p5.preload = preload(p5);
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
    engine.current.world.composites[0].bodies.forEach((body) => {
      p5.push();
      p5.fill(0, 0, 255);
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
      // p5.push();
      // p5.fill(0, 0, 120);
      // p5.quad(
      //   constraint.bodyB.vertices[0].x,
      //   constraint.bodyB.vertices[0].y,
      //   constraint.bodyB.vertices[1].x,
      //   constraint.bodyB.vertices[1].y,
      //   constraint.bodyB.vertices[2].x,
      //   constraint.bodyB.vertices[2].y,
      //   constraint.bodyB.vertices[3].x,
      //   constraint.bodyB.vertices[3].y
      // );
      // p5.pop();
      // p5.push();
      // p5.fill(0, 0, 255);
      // p5.rect(constraint.bodyA.position.x, constraint.bodyA.position.y, 10, 10);
      // p5.pop();
      // p5.push();
      // p5.fill(0, 0, 120);
      // p5.rect(constraint.bodyB.position.x, constraint.bodyB.position.y, 10, 10);
      // p5.pop();
    });
  };
}
function mousePressed(p5) {
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
  const ball = Bodies.rectangle(
    p5.mouseX,
    p5.mouseY,
    10 + Math.random() * 30,
    10 + Math.random() * 30,
    {
      mass: 10,
      restitution: 0.9,
      friction: 0.005,
      label: "box",
    }
  );
  Composite.add(engine.current.world, [ball]);
}

export default Canvas4;
