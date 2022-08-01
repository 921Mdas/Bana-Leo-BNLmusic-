const AWS = require("aws-sdk");
require("dotenv").config();
const Buffer = require("buffer").Buffer;

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

async function uploadFileAWS(file) {
  const baseData = Buffer.from("binary", file);
  console.log("aws file received", baseData);

  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: "middleware/uploads",
      Body: baseData,
      ACL: "public-read",
    };

    const data = await s3.upload(params).promise();
    console.log("file uploaded", data);
    return data.Location;
  } catch (error) {
    console.log(error);
  }
}

module.exports = uploadFileAWS;
