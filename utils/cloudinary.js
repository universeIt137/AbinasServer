// const cloudinary = require("cloudinary").v2;
let cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dolqt51cg",
  api_key: "864985823331812",
  api_secret: "abR39rnfPoJb5KXIZWDtbfKXbxU",
});

let uploadImage = async function (imagePath) {
  let options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    let result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;
