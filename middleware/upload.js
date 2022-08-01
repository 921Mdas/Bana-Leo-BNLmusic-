// const multer = require("multer");

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     console.log("filename middleware", file);
//     cb(null, file.originalname);
//   },
//   destination: function (req, file, cb) {
//     console.log("storage");
//     cb(null, "./uploads");
//   },
// });

// // const upload = multer({ storage: storage });

// const fileMulter = (req, res, next, text) => {
//   console.log("middleware working");

//   const fileStorageEngine = multer.diskStorage({
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//     destination: (req, file, cb) => {
//       cb(null, "./uploads");
//     },
//   });

//   const upload = multer({ storage: fileStorageEngine });

//   next();
// };

// module.exports = fileMulter;
