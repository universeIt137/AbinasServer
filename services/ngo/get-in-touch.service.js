const {
    JobCicular,
    Csr,
    Notice,
    ContactUs,
  } = require("../../models/ngo/get-in-touch-model");
  
  // ----------------------job circular -----------------------------------
  async function postAjobCircular(payload) {
    const result = await JobCicular.create(payload);
    return result;
  }
  async function getJobCirculars() {
    const result = await JobCicular.find({});
    return result;
  }
  async function getSingleJobCircular(id) {
    const result = await JobCicular.findOne({ _id: id });
    return result;
  }
  async function deleteJobCircular(id) {
    const result = await JobCicular.deleteOne({ _id: id });
    return result;
  }
  
  // -----------------------------------notice ---------------------------
  async function postAnotice(payload) {
    const result = await Notice.create(payload);
    return result;
  }
  async function getNotices() {
    const result = await Notice.find({});
    return result;
  }
  async function getSingleNotice(id) {
    const result = await Notice.findOne({ _id: id });
    return result;
  }
  async function deleteAnotice(id) {
    const result = await Notice.deleteOne({ _id: id });
    return result;
  }
  // -------------------------------Csr------------------------
  async function postAcsr(payload) {
    const result = await Csr.create(payload);
    return result;
  }
  async function getAllCsr() {
    const result = await Csr.find({});
    return result;
  }
  async function getSingleCsr(id) {
    const result = await Csr.findOne({ _id: id });
    return result;
  }
  async function deleteCsr(id) {
    const result = await Csr.deleteOne({ _id: id });
    return result;
  }
  
  // ------------------------------contact us--------------------------------
  async function createContact(payload) {
    const result = await ContactUs.create(payload);
    return result;
  }
  async function getAllContact() {
    const result = await ContactUs.find({});
    return result;
  }
  async function getSingleContact(id) {
    const result = await ContactUs.findOne({ _id: id });
    return result;
  }
  async function deleteContact(id) {
    const result = await ContactUs.deleteOne({ _id: id });
    return result;
  }
  
  const jobcircularServices = {
    postAjobCircular,
    getJobCirculars,
    getSingleJobCircular,
    deleteJobCircular,
  };
  const noticeServices = {
    postAnotice,
    getNotices,
    getSingleNotice,
    deleteAnotice,
  };
  const csrServices = {
    postAcsr,
    getAllCsr,
    getSingleCsr,
    deleteCsr,
  };
  const contactUsServices = {
    createContact,
    getAllContact,
    getSingleContact,
    deleteContact,
  };
  module.exports = {
    jobcircularServices,
    noticeServices,
    csrServices,
    contactUsServices,
  };
  