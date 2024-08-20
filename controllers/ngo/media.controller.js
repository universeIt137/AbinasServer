const httpStatus = require("http-status");

const httpResponse = require("../../utils/httpResponse.js");
const mediaServices = require("../../services/ngo/media.service.js");

async function postMedia(req, res) {
  try {
    let mediaImage;
    if (req?.files?.mediaImage) {
      mediaImage = `http://demoapi.abinashfoundation.com/images/mediaImage/${req?.files?.mediaImage[0]?.filename}`;
    }

    const result = await mediaServices.postMedia({ mediaImage });
    res
      .status(201)
      .json(httpResponse("success", result, "media posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

async function getAllfromMedia(req, res) {
  try {
    const result = await mediaServices.getAllMedia();
    res
      .status(200)
      .json(httpResponse("success", result, "media  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

async function deleteFromMedia(req, res) {
  try {
    const result = await mediaServices.deleteMedia(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "media  deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

let mediaController = {
  postMedia,
  getAllfromMedia,
  deleteFromMedia,
};

module.exports = mediaController;
