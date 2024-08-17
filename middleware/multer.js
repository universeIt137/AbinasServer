let multer = require("multer");

let stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "nidCopy") {
      cb(null, "./images/nidCopy");
    } else if (file.fieldname === "applicantPhoto") {
      cb(null, "./images/applicantPhoto");
    } else if (file.fieldname === "signature") {
      cb(null, "./images/signature");
    } else if (file.fieldname === "serviceImage") {
      cb(null, "./images/servicesImage");
    } else if (file.fieldname === "newsImage") {
      cb(null, "./images/newsImage");
    } else if (file.fieldname === "mediaImage") {
      cb(null, "./images/mediaImage");
    } else if (file.fieldname === "aboutImage") {
      cb(null, "./images/aboutImage");
    } else if (file.fieldname === "csrImage") {
      cb(null, "./images/csrImage");
    } else if (file.fieldname === "noticeImage") {
      cb(null, "./images/noticeImage");
    }
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split(".");
    let extension;
    if (parts.length > 1) {
      extension = "." + parts.pop();
    }
    const memberId = req.body.memberId;

    if (file.fieldname === "nidCopy") {
      cb(null, `${memberId}` + extension);
    } else if (file.fieldname === "applicantPhoto") {
      cb(null, `${memberId}` + extension);
    } else if (file.fieldname === "signature") {
      cb(null, `${memberId}` + extension);
    } else if (file.fieldname === "serviceImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "newsImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "mediaImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "aboutImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "csrImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "noticeImage") {
      cb(null, file.originalname);
    }
  },
});

let upload = multer({
  storage: stroage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("only png,jpg,jpeg format allowed"), false);
    }
  },
});

exports.upload = upload;
