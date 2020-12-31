import React, { useEffect, useRef } from "react";

const Visualiser = ({song, analyser, frequencyArray, check}) => {

  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  const color = ['#11114e',
  '#ffb6c1',
  '#72d472',
  '#f08080',
  '#778899'];

  const drawCanvas = () => {
     
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let radiusTemp = (window.innerWidth > window.innerHeight) ? window.innerHeight/3 : window.innerWidth/3;
      const radius = (radiusTemp > 10) ? radiusTemp : 10;
      const bars = 128;
      ctx.clearRect(0, 0, 1000, 1000, color[song]);
      drawCircle(canvas, ctx, radius-10);

      analyser.getByteFrequencyData(frequencyArray);
      for (var i = 0; i < bars; i++) {
        const height = 3+frequencyArray[i] * 0.3;

        drawLine({ i, bars, height, radius }, color[song], canvas, ctx);
      }

      requestRef.current = requestAnimationFrame(drawCanvas);
    }
  };

  useEffect(() => {if(check===true){
    requestRef.current = requestAnimationFrame(drawCanvas);
    }
    return () => {
    cancelAnimationFrame(requestRef.current);
    }
  }, [check, analyser, drawCanvas]);

  const drawCircle = (canvas, ctx, radius, color) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    ctx.save();
    ctx.shadowColor=color;   
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();
  };

  const drawLine = (opts, color, canvas, ctx) => {
    const { i, radius, bars, height } = opts;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const lineWidth = 5;
    const rads = (Math.PI * 2) / bars;

    const x = centerX + Math.cos(rads * i) * (radius);
    const y = centerY + Math.sin(rads * i) * (radius);
    const endX = centerX + Math.cos(rads * i) * (radius + height);
    const endY = centerY + Math.sin(rads * i) * (radius + height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    
    //ctx.shadowColor=color;   
    //ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };


  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Visualiser;
