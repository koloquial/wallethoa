export const addSlip = async ( uid, sheet, slip, postDate, type, payee, note, amount) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/slip`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            sheet: sheet,
            slip: slip,
            postDate: postDate,
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