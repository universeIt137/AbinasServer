const Concern = require("../../models/ngo/ourConcern.model");

async function postConcern(payload) {
  const result = await Concern.create(payload);
  return result;
}
async function getOurConcern() {
  const result = await Concern.find({});
  return result;
}
async function deleteOurConcern(id) {
  const result = await Concern.deleteOne({ _id: id });
  return result;
}

let concernServices = {
  postConcern,
  getOurConcern,
  deleteOurConcern,
};
module.exports = concernServices;
