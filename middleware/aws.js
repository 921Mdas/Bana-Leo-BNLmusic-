const AWS = require("aws-sdk");
require("dotenv").config();
const Buffer = require("buffer").Buffer;
const fs = require("fs");
const uuid = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

async function uploadFileAWS(file) {
  // const baseData = Buffer.from("binary", file);

  console.log(file.buffer);

  try {
    const param = {
      Bucket: process.env.AWS_BUCKET,
      Key: `new-${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    const data = await s3.upload(param).promise();
    console.log("file uploaded", data);
    return data.Location;
  } catch (error) {
    console.log(error);
  }
}

module.exports = uploadFileAWS;
