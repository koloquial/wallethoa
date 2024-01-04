export const deleteDeposit = async (uid, sheet, index) => {
    return await fetch(`http://localhost:5000/users/delete/deposit`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            sheet: sheet,
            index: index
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}