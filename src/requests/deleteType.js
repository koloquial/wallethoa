export const deleteType = async ( uid, index, type ) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/delete/type`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          index: index,
          type: type
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}