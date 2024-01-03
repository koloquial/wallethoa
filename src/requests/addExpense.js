export const addExpense = async (uid, sheet, datePick, type, payee, note, amount) => {
    fetch(`http://localhost:5000/users/add/expense-slip`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            sheet: sheet,
            postDate: datePick,
            type: type,
            payee: payee,
            note: note,
            amount: amount,
            dateCreated: new Date(),
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}