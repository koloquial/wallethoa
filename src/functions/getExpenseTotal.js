const getExpenseTotal = (sheet) => {
    return sheet.expenses.reduce((acc, cv) => {
        return acc + Number(cv.amount);
    }, 0)
}

export default getExpenseTotal;