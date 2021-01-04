import React, { Component, createRef } from 'react';

const bars = 128;
const bar_width = 3;
const color = ['#dae7ff', '#ffe8f8', '#d9fcdf', '#fcd9d9', '#e0e0e0'];

class Visualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
  }

  pixelRatio(ctx) {
    const dpr = window.devicePixelRatio || 1;
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    return dpr / bsr;
  }

  animationLooper(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const ratio = this.pixelRatio(ctx);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(ratio, ratio);
    const radiusTemp =
      canvas.width > canvas.height ? canvas.height / 4 : canvas.width / 4;
    const radius = radiusTemp > 10 ? radiusTemp / ratio : 10 / ratio;
    this.props.analyser.getByteFrequencyData(this.props.frequencyArray);
    const rads = (Math.PI * 2) / bars;
    for (var i = 0; i < bars; i++) {
      const bar_height = 10 + this.props.frequencyArray[i] * 0.3;
      const x = Math.cos(rads * i) * radius;
      const y = Math.sin(rads * i) * radius;
      const endX = Math.cos(rads * i) * (radius + bar_height);
      const endY = Math.sin(rads * i) * (radius + bar_height);

      //latency in mobile
      //this.drawCircle(ctx, radius - 5, this.props.color);

      this.drawBar(x, y, endX, endY, ctx, this.props.color);
    }
    this.rafId = requestAnimationFrame(() => {
      this.animationLooper(canvas);
    });
  }

  //latency in mobile
  /*
  drawCircle(ctx, radius, color) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  */
  drawBar(x, y, endX, endY, ctx) {
    //latency in mobile
    //ctx.shadowColor = color;
    //ctx.shadowBlur = 3;
    ctx.strokeStyle = color[this.props.song];
    ctx.lineWidth = bar_width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  componentDidMount() {
    if (this.props.check) {
      this.rafId = requestAnimationFrame(() => {
        this.animationLooper(this.canvas.current);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.check !== this.props.check) {
      this.rafId = requestAnimationFrame(() => {
        this.animationLooper(this.canvas.current);
      });
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  render() {
    return <canvas ref={this.canvas} />;
  }
}

export default Visualiser;
