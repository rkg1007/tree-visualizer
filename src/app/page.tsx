'use client'

import "./style.css";

export default function Home() {
  return (
    <div>
      <div className="input-container">
        <textarea className="input-box" cols={30} rows={3}></textarea>
      </div>
      <canvas
        ref={canvas}
        className="canvas"
        height={window.innerHeight}
        width={window.innerWidth}
      ></canvas>
    </div>
  );
}


