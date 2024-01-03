import getIncomeTotal from './getIncomeTotal';
import getExpenseTotal from './getExpenseTotal';

const getTotalSum = (sheet) => {
    let sum = parseFloat(parseFloat(sheet.startingBalance) + parseFloat(getIncomeTotal(sheet)) - parseFloat(getExpenseTotal(sheet))).toFixed(2);
    console.log('sum', sum);
    return sum;
}

export default getTotalSum;

