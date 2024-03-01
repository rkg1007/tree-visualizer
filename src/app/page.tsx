"use client";

import { ChangeEvent, useRef } from "react";
import { isValidInput } from "@/lib/utils";
import { drawTree } from "@/lib/draw";
import "./style.css";

export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null); // Specify the type of the ref

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (isValidInput(input) && canvas.current) {
      canvas.current.height = window.innerHeight;
      canvas.current.width = window.innerWidth;
      const context = canvas.current.getContext("2d");
      drawTree(context, input);
    }
  };

  return (
    <div className="main">
      <div className="input-container">
        <textarea
          onChange={handleInput}
          className="input-box"
          cols={30}
          rows={2}
          placeholder="Enter Your Input Here..."
        ></textarea>
      </div>
      <canvas
        ref={canvas}
        className="canvas"
      ></canvas>
    </div>
  );
}
