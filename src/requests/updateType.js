export const updateType = async ( uid, item, index, type) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/update/type`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            item: item,
            index: index,
            type: type,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}