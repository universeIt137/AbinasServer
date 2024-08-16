let User = require("../models/ngo/User.js");

let findLastUserId = async function () {
  try {
    let findLastUser = await User.findOne({ role: "user" })
      .sort({
        createdAt: -1,
      })
      .lean();

    return findLastUser && findLastUser.id
      ? findLastUser.id.substring(6)
      : null;
  } catch (err) { }
};

let genrerateUserId = async function () {
  let currentid = (await findLastUserId()) || "0";

  let incrementUserId = (parseInt(currentid) + 1).toString().padStart(5, "0");

  let finalId = "MEM-AB" + incrementUserId;

  return finalId;
};

let userUtils = {
  genrerateUserId: genrerateUserId,
};

module.exports = userUtils;
