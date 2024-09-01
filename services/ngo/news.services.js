const News = require("../../models/ngo/news.model");

async function postAnews(payload) {
  const result = await News.create(payload);
  return result;
}

async function getAllNewses() {
  const result = await News.find({});
  return result;
}

async function getSingleNews(id) {
  const result = await News.findById({ _id: id });
  return result;
}

async function deleteNews(id) {
  const result = await News.deleteOne({ _id: id });
  return result;
}

const newsServices = {
  postAnews,
  getAllNewses,
  getSingleNews,
  deleteNews,
};
module.exports = newsServices;
