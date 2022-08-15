// aws function to save files into a bucket
const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

async function uploadFileAWS(file) {
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET,
      Key: `new-${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: "audio/mpeg",
    };
    const data = await s3.upload(param).promise();
    return await data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = uploadFileAWS;
