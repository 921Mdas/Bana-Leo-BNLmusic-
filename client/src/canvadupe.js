// const canvasSketch = require("canvas-sketch");
// const random = require("canvas-sketch-util/random");
// const math = require("canvas-sketch-util/math");
// const eases = require("eases");
// const colormap = require("colormap");

// export const SKETCH = () => {
//   const settings = {
//     dimensions: [1080, 1080],
//     animate: true,
//   };

//   let x, y, circleNums, audio, sourceNode, audioContext;
//   let r, colors, CanvasEl, manager;
//   let analyzerNode, audioData;

//   const sketch = ({ canvas, width, height }) => {
//     x = width * 0.5;
//     y = height * 0.5;

//     let numCircles = 5;
//     let slices = 6;
//     let radius = 200;
//     let slice = (Math.PI * 2) / slices;

//     const bins = [179, 30, 11, 30, 12, 24, 53, 8, 179];

//     colors = colormap({
//       colormap: "summer",
//       nshades: 10,
//     });

//     return ({ context, width, height }) => {
//       context.fillStyle = "white";
//       context.fillRect(0, 0, width, height);
//       if (!audioContext) return;
//       analyzerNode?.getFloatFrequencyData(audioData);
//       // the average is not very useful as data because it is too small
//       const avg = getAverage(audioData);
//       // change the range to positive integers between 0 and 1
//       let sorted = audioData.sort((a, b) => {
//         return b - a;
//       });

//       context.save();
//       context.translate(x, y);
//       for (let i = 0; i < bins.length; i++) {
//         const bin = bins[i];
//         const mapped = math.mapRange(
//           audioData[bin],
//           analyzerNode.minDecibels,
//           analyzerNode.maxDecibels,
//           0,
//           1,
//           true
//         );
//         const radius = Math.floor(mapped * 100);

//         context.save();
//         context.beginPath();
//         context.rotate((30 * i * Math.PI) / 60);
//         context.lineWidth = i * 10;
//         context.arc(0, 0, radius + i * 50, 0, slice);
//         context.stroke();
//         context.restore();
//       }
//       context.restore();
//     };
//   };

//   const addListener = () => {
//     window.addEventListener("mouseup", () => {
//       if (!audioContext) createAudio();
//       if (audio.paused) {
//         audio.play();
//         manager.play();
//       } else {
//         audio.pause();
//         manager.pause();
//       }
//     });
//   };

//   const createAudio = () => {
//     audio = document.createElement("audio");
//     audio.src = require("./audio/new-Yolele.mp3");

//     audioContext = new AudioContext();
//     sourceNode = audioContext.createMediaElementSource(audio);

//     sourceNode.connect(audioContext.destination);
//     analyzerNode = audioContext.createAnalyser();
//     analyzerNode.fftSize = 512;
//     analyzerNode.smoothingTimeConstant = 0.5;
//     sourceNode.connect(analyzerNode);
//     audioData = new Float32Array(analyzerNode.frequencyBinCount);
//   };

//   const getAverage = data => {
//     let sum = 0;

//     for (let i = 0; i < data?.length; i++) {
//       sum += data[i];
//     }

//     return sum / data?.length;
//   };

//   const start = async () => {
//     addListener();
//     manager = await canvasSketch(sketch, settings);
//     console.log(manager);
//     manager.pause();
//   };

//   start();

//   return <div style={{ color: "red" }}>Wlc</div>;
// };

// class point {
//   constructor({ x, y, radius = 10 }) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//   }

//   update(x, y, avg) {
//     this.radius = this.radius;
//   }

//   draw(context) {
//     context.save();
//     context.translate(this.x, this.y);
//     context.fillStyle = "coral";
//     context.arc(0, 0, this.radius, 0, Math.PI * 2);
//     context.fill();
//     context.restore();
//   }
// }
