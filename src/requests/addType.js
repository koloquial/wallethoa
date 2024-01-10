export const addType = async ( uid, item, type) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/type`, {
            method: 'POST',
            body: JSON.stringify({
              uid: uid,
              item: item,
              type: type,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .catch(error => console.log('error', error))
}