export const deleteIncomeType = async ( uid, index ) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/delete/income-type`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          index: index
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}