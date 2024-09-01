const Media = require("../../models/ngo/media.model");

async function postMedia(payload) {
  const result = await Media.create(payload);
  return result;
}

async function getAllMedia() {
  const result = await Media.find({});
  return result;
}

// async function getSingleNews(id) {
//   const result = await Media.findById({ _id: id });
//   return result;
// }

async function deleteMedia(id) {
  const result = await Media.deleteOne({ _id: id });
  return result;
}

const mediaServices = {
  postMedia,
  getAllMedia,
  deleteMedia,
};
module.exports = mediaServices;
