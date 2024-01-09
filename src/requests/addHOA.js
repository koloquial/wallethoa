export const addHOA = async ( uid, name) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/update/hoa-name`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            name: name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}