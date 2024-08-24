const httpStatus = require("http-status");
const AboutUsServices = require("../../services/ngo/about-us.service");
const httpResponse = require("../../utils/httpResponse");

async function postAboutUs(req, res) {
  try {
    if (req?.files?.aboutImage) {
      req.body.aboutImage = `http://demoapi.abinashfoundation.com/images/aboutImage/${req?.files?.aboutImage[0]?.filename}`;
    }

    const result = await AboutUsServices.postAboutUs(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "about us posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, "something went wrong"));
  }
}
async function getAbout(req, res) {
  try {
    const result = await AboutUsServices.getAbout();
    res
      .status(200)
      .json(httpResponse("success", result, "about us  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, "something went wrong"));
  }
}
async function deleteAbout(req, res) {
  try {
    const result = await AboutUsServices.deleteAbout(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "something went wrong"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, "something went wrong"));
  }
}
const aboutUsController = {
  postAboutUs,
  getAbout,
  deleteAbout,
};
module.exports = aboutUsController;
