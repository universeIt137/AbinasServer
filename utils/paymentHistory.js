const getLastDateOfMonth = (date, lastPayDate) => {
    const lastDate = new Date(date);
    if ([29, 30, 31].includes(lastPayDate)) {
      lastPayDate = 28;
    }
    lastDate.setUTCDate(lastPayDate);
    lastDate.setMonth(lastDate.getMonth());
    const returnDate = lastDate.toISOString().split("T")[0];
    return returnDate;
  };
  const getPaymentHistory = (
    noOfInstallment,
    monthlyInstAmount,
    interestRate,
    openingDate,
  
    paymentAmount,
    lastPayDate
  ) => {
    const paymentHistory = [];
    const currentDate = new Date(openingDate);
    // console.log(currentDate.getDate());
    if (currentDate.getDate() > lastPayDate) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    for (let i = 1; i <= noOfInstallment; i++) {
      let LastDateOfMonth = getLastDateOfMonth(currentDate, lastPayDate);
  
      const paymentHistoryEntry = {
        lastDate: LastDateOfMonth,
        interestRate,
        installmentNo: i,
        monthlyInstAmount,
        paymentAmount,
      };
      currentDate.setMonth(currentDate.getMonth() + 1);
      paymentHistory.push(paymentHistoryEntry);
    }
  
    return paymentHistory;
  };
  
  module.exports = {
    getLastDateOfMonth,
    getPaymentHistory,
  };
  