import React, { useEffect, useRef } from "react";
import { canvas } from "canvas-sketch";
import { math, random } from "canvas-sketch-util";
import { GiDrum } from "react-icons/gi";
import drum from "../images-client/drumicon.png";

const Canvas = () => {
  const canvasRef = useRef(null);
  const img = useRef(null);
  let w = window.innerWidth;
  let h = window.innerHeight;
  let center_x = w / 2;
  let center_y = h / 2;
  let numdraws = 20;
  let lineW;
  let randomRad;

  const draw = (context, x, y, radius, rad, lineW) => {
    console.log(rad);
    context.save();
    context.strokeStyle = "white";
    context.lineWidth = lineW;

    context.beginPath();
    context.translate(x, y);
    context.arc(0, 0, radius, 0, Math.PI * rad);
    context.stroke();
    context.restore();
  };

  const drawLine = (context, x, y, lineW) => {
    context.save();
    context.strokeStyle = "white";
    context.lineWidth = lineW;
    context.beginPath();
    context.translate(x, y);
    context.moveTo(0, 0);
    context.lineTo(100, 200);
    context.stroke();
    context.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imgCurrent = img.current;
    context.fillStyle =
      "url('http://images.dailyhive.com/20170427164048/13227450_10153595742653316_7044641838787816509_o.jpg')";
    context.fillRect(0, 0, w, h);

    for (let i = 0; i < numdraws; i++) {
      for (let j = 0; j < numdraws; j++) {
        lineW = random.range(0, 2);
        randomRad = Math.floor(random.range(1, 3));
        draw(context, 100 * i, 100 * j, i + 10, randomRad, lineW);
        drawLine(context, 100 * i, 100 * j, lineW);
      }
    }
  }, []);

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      />
      <div style={{ display: "none" }}>
        <img src={drum} ref={img} id="xy" />
      </div>
    </>
  );
};

export default Canvas;
