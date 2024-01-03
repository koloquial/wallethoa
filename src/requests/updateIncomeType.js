export const updateIncomeType = async ( uid, type, index ) => {
    return await fetch(`http://localhost:5000/users/update/income-type`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            type: type,
            index: index
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}