const getIncomeTotal = (sheet) => {
    return sheet.income.reduce((acc, cv) => {
        return acc + Number(cv.amount);
    }, 0)
}

export default getIncomeTotal;