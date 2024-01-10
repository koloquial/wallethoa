export const addNote = async (uid, sheet, type, itemIndex, item) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/note`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          sheet: sheet,
          type: type,
          itemIndex: itemIndex,
          item: item,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     .then(res => res.json())
     .catch(error => console.log('error', error))
}