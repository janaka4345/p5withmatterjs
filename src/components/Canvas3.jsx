import { useEffect, useRef } from "react";
import { Engine, Render, Bodies, Runner, Composite } from "matter-js";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let scene;
let isPressed;
let engine;
function Canvas3(props) {
  console.log("klhj");
  scene = useRef();
  isPressed = useRef(false);
  engine = useRef(Engine.create());

  useEffect(() => {
    const cw = 800;
    const ch = 800;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

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
    // Render.run(render);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
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
          // render: {
          //   fillStyle: "#0000ff",
          // },
          label: "box",
        }
      );
      Composite.add(engine.current.world, [ball]);
    }
  };

  return (
    <div
      // onMouseDown={handleDown}
      // onMouseUp={handleUp}
      // onMouseMove={handleAddCircle}
      onClick={handleAddCircle}
    >
      <div
        ref={scene}
        // style={{ width: "100%", height: "100%" }}
      >
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}

function sketch(p5) {
  // p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  // p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(800, 800);
  };
}
function draw(p5) {
  return () => {
    p5.background(250, 120, 0);
    engine.current.world.bodies.forEach((body) => {
      if (body.label === "box") {
        // p5.fill(255, 0, 0);
        p5.rect(
          body.position.x,
          body.position.y,
          body.bounds.max.x - body.bounds.min.x,
          body.bounds.max.y - body.bounds.min.y
        );
        p5.fill(255, 0, 0);
      }
      if (body.label === "wall") {
        // p5.fill(255, 0, 0);
        p5.rect(
          body.position.x,
          body.position.y - 400,
          body.bounds.max.x - body.bounds.min.x,
          body.bounds.max.y - body.bounds.min.y
        );
        p5.fill(0, 255, 0);
      }
    });
  };
}

export default Canvas3;
