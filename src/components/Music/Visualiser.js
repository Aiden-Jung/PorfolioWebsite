import React, { useEffect, useRef } from 'react';

const Visualiser = ({ analyser, frequencyArray, check, color }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  const pixelRatio = (ctx) => {
    const dpr = window.devicePixelRatio || 1;
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    return dpr / bsr;
  };

  const drawCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const ratio = pixelRatio(ctx);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      let radiusTemp =
        canvas.width > canvas.height ? canvas.height / 4 : canvas.width / 4;
      const radius = radiusTemp > 10 ? radiusTemp / ratio : 10 / ratio;
      const bars = 128;

      ctx.clearRect(0, 0, 1000, 1000);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(ratio, ratio);

      drawCircle(ctx, radius - 5, color);

      analyser.getByteFrequencyData(frequencyArray);
      for (let i = 0; i < bars; i++) {
        const height = 3 + frequencyArray[i] * 0.3;

        drawLine({ i, bars, height, radius }, ctx, color);
      }

      requestRef.current = requestAnimationFrame(drawCanvas);
    }
  };

  useEffect(() => {
    if (check === true) {
      requestRef.current = requestAnimationFrame(drawCanvas);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [check, analyser, drawCanvas]);

  const drawCircle = (ctx, radius, color) => {
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawLine = (opts, ctx, color) => {
    const { i, radius, bars, height } = opts;
    const lineWidth = 3;
    const rads = (Math.PI * 2) / bars;

    const x = Math.cos(rads * i) * radius;
    const y = Math.sin(rads * i) * radius;
    const endX = Math.cos(rads * i) * (radius + height);
    const endY = Math.sin(rads * i) * (radius + height);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  return <canvas ref={canvasRef} />;
};

export default Visualiser;
