export const updateIncomeType = async ( uid, type, index ) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/update/income-type`, {
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