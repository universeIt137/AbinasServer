let mongoose = require("mongoose");

const jobcircularSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    jobDescription: {
      type: String,
      required: [true, "jobDescription is required"],
    },
    salary: {
      type: String,
    },
    experience: {
      type: String,
    },
    deadline: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    noticeImage: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const csrSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    csrImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    mobile: {
      type: Number,
      required: [true, "number is required"],
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
  },
  {
    timestamps: true,
  }
);

const JobCicular = mongoose.model("jobcircular", jobcircularSchema);
const Csr = mongoose.model("csr", csrSchema);
const Notice = mongoose.model("notice", noticeSchema);
const ContactUs = mongoose.model("contactus", contactUsSchema);
module.exports = {
  JobCicular,
  Csr,
  Notice,
  ContactUs,
};
