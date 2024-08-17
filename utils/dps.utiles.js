const Dps = require("../models/ngo/dps.model.js");

let findLastDpsById = async function () {
  try {
    let findLastDps = await Dps.find({}).sort({
      createdAt: -1,
    });

    return findLastDps[0] && findLastDps[0].dpsNo
      ? findLastDps[0].dpsNo.substring(7)
      : null;
  } catch (err) {}
};

let generateDpsNo = async function () {
  let currentid = (await findLastDpsById()) || "0";

  let incrementDpsNo = (parseInt(currentid) + 1).toString().padStart(5, "0");

  let finalNo = "DPS-AB-" + incrementDpsNo;

  return finalNo;
};

const dpsUtiles = {
  generateDpsNo,
};

module.exports = dpsUtiles;
