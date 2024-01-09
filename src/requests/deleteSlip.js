export const deleteSlip = async (uid, sheet, type, index) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/delete/slip`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            sheet: sheet,
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