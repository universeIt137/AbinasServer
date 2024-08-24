const httpStatus = require("http-status");
const {
  jobcircularServices,
  noticeServices,
  csrServices,
  contactUsServices,
} = require("../../services/ngo/get-in-touch.service");
const httpResponse = require("../../utils/httpResponse");
// -------------------------------job circular------------------------
async function postAjobCircular(req, res) {
  try {
    const result = await jobcircularServices.postAjobCircular(req.body);
    res
      .status(200)
      .json(
        httpResponse("success", result, "job circular  posted successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getJobCirculars(req, res) {
  try {
    const result = await jobcircularServices.getJobCirculars();
    res
      .status(200)
      .json(
        httpResponse("success", result, "job circular  retrive successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingleJobCircular(req, res) {
  try {
    const result = await jobcircularServices.getSingleJobCircular(
      req.params.id
    );
    res
      .status(200)
      .json(
        httpResponse("success", result, "job circular  retrive successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteJobCircular(req, res) {
  try {
    const result = await jobcircularServices.deleteJobCircular(req.params.id);
    res
      .status(200)
      .json(
        httpResponse("success", result, "job circular  deleted successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

// --------------------------------------notice-----------------------
async function postAnotice(req, res) {
  try {
    if (req?.files?.noticeImage) {
      req.body.noticeImage = `http://demoapi.abinashfoundation.com/images/noticeImage/${req?.files?.noticeImage[0]?.filename}`;
    }
    const result = await noticeServices.postAnotice(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "notice  posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getNotices(req, res) {
  try {
    const result = await noticeServices.getNotices();
    res
      .status(200)
      .json(httpResponse("success", result, "notice   retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingleNotice(req, res) {
  try {
    const result = await noticeServices.getSingleNotice(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "notice  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteAnotice(req, res) {
  try {
    const result = await noticeServices.deleteAnotice(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "notice  deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

// ----------------------------------- csr-------------------------------------------------
async function postAcsr(req, res) {
  try {
    if (req?.files?.csrImage) {
      req.body.csrImage = `http://demoapi.abinashfoundation.com/images/csrImage/${req?.files?.csrImage[0]?.filename}`;
    }
    const result = await csrServices.postAcsr(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "csr  posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getAllCsr(req, res) {
  try {
    const result = await csrServices.getAllCsr();
    res
      .status(200)
      .json(httpResponse("success", result, "csr retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingleCsr(req, res) {
  try {
    const result = await csrServices.getSingleCsr(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "csr  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteCsr(req, res) {
  try {
    const result = await csrServices.deleteCsr(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "csr   deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

// ------------------------------------------contact us-------------------------
async function postContact(req, res) {
  try {
    const result = await contactUsServices.createContact(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "contact posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getAllContact(req, res) {
  try {
    const result = await contactUsServices.getAllContact();
    res
      .status(200)
      .json(httpResponse("success", result, "contact us retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingleContact(req, res) {
  try {
    const result = await contactUsServices.getSingleContact(req.params.id);
    res
      .status(200)
      .json(
        httpResponse("success", result, "contact us  retrive successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteContact(req, res) {
  try {
    const result = await contactUsServices.deleteContact(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "contact deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

const noticeController = {
  postAnotice,
  deleteAnotice,
  getSingleNotice,
  getNotices,
};
const contactController = {
  postContact,
  deleteContact,
  getSingleContact,
  getAllContact,
};
const csrController = {
  postAcsr,
  deleteCsr,
  getAllCsr,
  getSingleCsr,
};
const jobcircularController = {
  postAjobCircular,
  getJobCirculars,
  getSingleJobCircular,
  deleteJobCircular,
};
module.exports = {
  jobcircularController,
  noticeController,
  csrController,
  contactController,
};
