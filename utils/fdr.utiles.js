const Fdr = require("../models/ngo/fdr.model");

const findLastFdrId = async function (type) {
  try {
    let findLastFdrNo = await Fdr.find({ type }).sort({
      createdAt: -1,
    });

    return findLastFdrNo[0] && findLastFdrNo[0].fdrNo
      ? findLastFdrNo[0].fdrNo.substring(7)
      : null;
  } catch (err) {}
};

const generateFdrNo = async function (type) {
  let currentid = (await findLastFdrId(type)) || "0";

  let incrementFdrNo = (parseInt(currentid) + 1).toString().padStart(5, "0");

  let finalNo = `FDR-${type.substring(0, 2).toUpperCase()}-${incrementFdrNo}`;

  return finalNo;
};

const fdrutiles = {
  generateFdrNo,
};

module.exports = fdrutiles;
