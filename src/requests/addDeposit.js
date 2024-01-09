export const addDeposit = async ( uid, sheet, postDate, type, note, amount) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/deposit`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            sheet: sheet,
            postDate: postDate,
            type: type,
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