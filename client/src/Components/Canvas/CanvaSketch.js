// import React, { useRef, useEffect } from "react";
// import canvas from "canvas-sketch";
// import { math, random } from "canvas-sketch-util";
// import CreateAudio from "./CreateAudio";
// import { sketch, SKETCH } from "../../canva";

// let audio, audioContext, sourceNode, analyzerNode, audioData;

// const getAverage = data => {
//   let sum = 0;

//   for (let i = 0; i < data?.length; i++) {
//     sum += data[i];
//   }

//   return sum / data?.length;
// };

// const CanvaSketch = props => {
//   const canvasRef = useRef(null);

//   //   const draw = (context, x, y, frameCount) => {
//   //     context.save();
//   //     context.fillStyle = "white";
//   //     context.beginPath();
//   //     context.arc(50, 100, 20, 0, 2 * Math.PI);
//   //     context.fill();
//   //     context.restore();
//   //   };

//   const CreateAudio = () => {
//     audio = document.createElement("audio");
//     audio.src = require("../../audio/new-Yolele.mp3");
//     audio.crossOrigin = "anonymous";
//     audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     sourceNode = audioContext.createMediaElementSource(audio);
//     sourceNode.connect(audioContext.destination);
//     analyzerNode = audioContext.createAnalyser();
//     sourceNode.connect(analyzerNode);
//     analyzerNode.fftSize = 512;
//   };

//   const addListener = () => {
//     window.addEventListener("mouseup", () => {
//       if (!audioContext) CreateAudio();
//       if (audio.paused) {
//         audio.play();
//       } else {
//         audio.pause();
//       }
//     });
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     let x = canvas.width * 0.5;
//     let y = canvas.height * 0.5;
//     let frameCount = 0;
//     let animationFrameId;

//     context.fillStyle = "black";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     // context.save();
//     // // instead of the above point, we can also draw a quadratic curve
//     // context.lineWidth = 2;
//     // //   context.clearRect(0, 0, canvas.width, canvas.height);
//     // context.strokeStyle = "white";
//     // //   context.translate(x, y);
//     // context.beginPath();
//     // context.arc(0, 0, 50, 0, Math.PI * 2);
//     // context.stroke();
//     // context.restore();

//     const render = () => {
//       frameCount++;

//       audioData = new Float32Array(analyzerNode?.frequencyBinCount);
//       // call createaudio
//       if (!audioData) return;
//       analyzerNode?.getFloatFrequencyData(audioData);
//       // Math.abs(audioData[20] / 10);
//       context.save();
//       // instead of the above point, we can also draw a quadratic curve
//       context.lineWidth = 2;
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.strokeStyle = "white";
//       context.translate(x, y);
//       context.beginPath();
//       context.arc(0, 0, 20 + Math.abs(audioData[20] / 10), 0, Math.PI * 2);
//       context.stroke();
//       context.restore();

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.cancelAnimationFrame(animationFrameId);
//       analyzerNode?.disconnect();
//       sourceNode?.disconnect();
//     };
//   }, []);

//   addListener();

//   return (
//     <div className="canvas">
//       <canvas ref={canvasRef} width={window.innerWidth} height={500}></canvas>
//     </div>
//   );
// };

// export default CanvaSketch;

// Canvaa React

// canvas
//   const canvasRef = useRef(null);
//   const player = useRef(null);

//   newSong = CongoPlayLists.start();

//   const NextSong = async () => {
//     newSong = await newSong?.next();
//   };

//   const CreateAudio = async () => {
//     audio = await document.createElement("audio");
//     audio.src = await newSong?.value.track;
//     audio.crossOrigin = "anonymous";

//     audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     sourceNode = audioContext.createMediaElementSource(audio);
//     analyzerNode = audioContext.createAnalyser();
//     sourceNode.connect(analyzerNode);
//     analyzerNode.connect(audioContext.destination);
//     analyzerNode.fftSize = 512;

//     audioData = new Float32Array(analyzerNode.frequencyBinCount);
//   };

//   useEffect(() => {
//     CreateAudio();
//   });

//   const addListener = () => {
//     player.current?.addEventListener("mouseup", () => {
//       console.log(audio);

//       if (audio.paused) {
//         audio.play();
//       } else {
//         audio.pause();
//       }
//     });
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     let x = canvas.width * 0.5;
//     let y = canvas.height * 0.5;

//     let animationFrameId;

//     context.fillStyle = "black";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     const bins = [179, 30, 11, 30, 12, 24, 53, 8, 179];

//     let numCircles = 5;
//     let slices = 6;
//     let radius = 200;
//     let slice = (Math.PI * 2) / slices;

//     const render = () => {
//       // call createaudio
//       if (!audioData) return;
//       analyzerNode?.getFloatFrequencyData(audioData);

//       context.save();
//       // instead of the above point, we can also draw a quadratic curve
//       context.lineWidth = 2;
//       context.strokeStyle = "white";
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.translate(x + 350, y);
//       context.beginPath();
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
//         context.arc(0, 0, radius + i * 30, 0, slice);
//         context.stroke();
//         context.restore();
//       }

//       context.restore();

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();
//     addListener();

//     return () => {
//       window.cancelAnimationFrame(animationFrameId);
//       analyzerNode?.disconnect();
//       sourceNode?.disconnect();
//     };
//   }, []);

// <canvas
//   className="canvas"
//   ref={canvasRef}
//   width={window.innerWidth}
//   height={500}
// ></canvas>;

//  <button ref={player}>Play</button>
//             <button onClick={() => NextSong}>Next</button>
