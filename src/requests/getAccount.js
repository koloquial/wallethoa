export const getAccount = async (uid) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/${uid}`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(res => res.json(res))
        .catch(err => console.log('err', err))
}