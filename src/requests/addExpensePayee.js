export const addExpensePayee = async (uid, payee) => {
    return await fetch(`http://localhost:5000/users/add/expense-payee`, {
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