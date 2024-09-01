const AboutUs = require("../../models/ngo/about-us.model");

async function postAboutUs(payload) {
  const result = await AboutUs.create(payload);
  return result;
}
async function getAbout() {
  const result = await AboutUs.find({});
  return result;
}
async function deleteAbout(id) {
  const result = await AboutUs.deleteOne({ _id: id });
  return result;
}

const AboutUsServices = {
  postAboutUs,
  getAbout,
  deleteAbout,
};
module.exports = AboutUsServices;
