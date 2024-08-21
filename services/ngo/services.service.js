const httpStatus = require("http-status");
const Services = require("../../models/ngo/services.model");

async function createServices(data) {
  let result;

  if (data.keyFeatures) {
    data.keyFeatures = JSON.parse(data.keyFeatures);
  }
  if (data.specialNote) {
    data.specialNote = JSON.parse(data.specialNote);
  }
  result = await Services.create(data);

  return result;
}
async function getAllServices() {
  const result = await Services.find({});
  return result;
}

async function getSingleService(id) {
  const result = await Services.findById({ _id: id });
  return result;
}

async function deleteService(id) {
  const result = await Services.deleteOne({ _id: id });
  return result;
}
let NgoServices = {
  createServices,
  getAllServices,
  getSingleService,
  deleteService,
};
module.exports = NgoServices;
