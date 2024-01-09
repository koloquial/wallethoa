export const addSheet = async (uid, name, balance) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/sheet`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          name: name,
          balance: balance
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     .then(res => res.json())
     .catch(error => console.log('error', error))
}