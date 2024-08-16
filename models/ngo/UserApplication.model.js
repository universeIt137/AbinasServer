let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userApplicationSchema = new Schema(
  {
    progressPercentage: {
      type: Number,
      required: true,
      default: 20,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    memberId: {
      type: String,
    },
    personalInformation: {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      nameBangla: {
        type: String,
      },
      fathersName: {
        type: String,
      },
      mothersName: {
        type: String,
      },
      dob: {
        type: Date,
      },
      nidNumber: {
        type: Number,
        default: null,
      },
      phone: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        lowercase: true,
      },

      maritalStatus: {
        type: String,
        enum: ["unmarried", "married"],
      },
      applicationDate: {
        type: Date,
      },
      applicantPhoto: {
        type: String,
      },
      nidCopy: {
        type: String,
      },
      signature: {
        type: String,
      },
    },
    jobDescription: {
      designation: {
        type: String,
      },
      organization: {
        type: String,
      },
      dutyWordName: {
        type: String,
      },
      dutyShift: {
        type: String,
      },
      familiarColleaguesName1: {
        type: String,
      },
      familiarColleaguesNumber1: {
        type: String,
      },
      familiarColleaguesName2: {
        type: String,
      },
      familiarColleaguesNumber2: {
        type: String,
      },
      familiarColleaguesName3: {
        type: String,
      },
      familiarColleaguesNumber3: {
        type: String,
      },
    },
    address: {
      presentaddress: {
        village: {
          type: String,
        },
        upazila: {
          type: String,
        },
        roadNo: {
          type: Number,
        },
        distric: {
          type: String,
        },
        union: {
          type: String,
        },
        postalcode: {
          type: Number,
        },
      },
      permanentaddress: {
        village: {
          type: String,
        },
        upazila: {
          type: String,
        },
        roadNo: {
          type: Number,
        },
        distric: {
          type: String,
        },
        union: {
          type: String,
        },
        postalcode: {
          type: Number,
        },
      },
    },
    familyInformation: {
      husbandOrWifesPhoneNo: {
        type: String,
      },
      FatherOrBrotherOrSistersPhoneNo: {
        type: String,
      },
    },
    licensingAbility: {
      bnmcRegistrationNo: {
        type: String,
      },
      bnmcRegistrationYear: {
        type: Number,
      },
    },
    educationalInformation: [
      {
        examName: {
          type: String,
        },
        passingYear: {
          type: Number,
        },
        institutesName: {
          type: String,
        },
        board: {
          type: String,
        },
      },
    ],
    nomineeInformation: {
      nomineeInformation01: {
        nomineeInformationName: {
          type: String,
        },
        nomineeInformationRelation: {
          type: String,
        },
        nomineeInformationNumber: {
          type: Number,
        },
        nomineeInformationDistribution: {
          type: String,
        },
      },
      nomineeInformation02: {
        nomineeInformationName: {
          type: String,
        },
        nomineeInformationRelation: {
          type: String,
        },
        nomineeInformationNumber: {
          type: Number,
        },
        nomineeInformationDistribution: {
          type: String,
        },
      },
    },
  },
  { timestamps: true }
);

let UserApplication = mongoose.model("userApplication", userApplicationSchema);

module.exports = UserApplication;
