export const updateSlip = async ( uid, sheet, type, slip, itemIndex ) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/update/slip`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          sheet: sheet,
          type: type,
          slip: slip,
          itemIndex: itemIndex,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}
