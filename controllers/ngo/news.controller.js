const httpStatus = require("http-status");
let newsServices = require("../../services/ngo/news.services.js");
const httpResponse = require("../../utils/httpResponse.js");

async function postAnews(req, res) {
  try {
    if (req?.files?.newsImage) {
      req.body.newsImage = `http://demoapi.abinashfoundation.com/images/newsImage/${req?.files?.newsImage[0]?.filename}`;
    }

    const result = await newsServices.postAnews(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "news posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

async function getAllNewses(req, res) {
  try {
    const result = await newsServices.getAllNewses();
    res
      .status(200)
      .json(httpResponse("success", result, "newses  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingelNews(req, res) {
  try {
    const result = await newsServices.getSingleNews(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "news  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteNews(req, res) {
  try {
    const result = await newsServices.deleteNews(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "news  deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

let newsController = {
  postAnews,
  getAllNewses,
  getSingelNews,
  deleteNews,
};

module.exports = newsController;
