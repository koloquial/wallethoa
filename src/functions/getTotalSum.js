import getIncomeTotal from './getIncomeTotal';
import getExpenseTotal from './getExpenseTotal';

const getTotalSum = (sheet) => {
    let sum = parseFloat(parseFloat(sheet.startingBalance) + parseFloat(getIncomeTotal(sheet)) - parseFloat(getExpenseTotal(sheet))).toFixed(2);
    return sum;
}

export default getTotalSum;

