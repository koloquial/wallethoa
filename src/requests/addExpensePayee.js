export const addExpensePayee = async (uid, payee) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/expense-payee`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            payee: payee
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}