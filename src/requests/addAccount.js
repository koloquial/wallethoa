export const addAccount = async ( uid, email ) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add-account`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            uid: uid,
            admin: email
        })
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}