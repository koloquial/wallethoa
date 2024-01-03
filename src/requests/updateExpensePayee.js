export const updateExpensePayee = async ( uid, payee, index) =>  {
    return await fetch(`http://localhost:5000/users/update/expense-payee`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            payee: payee,
            index: index
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}