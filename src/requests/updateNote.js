export const updateNote = async (uid, sheet, type, item, itemIndex, editIndex) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/update/note`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          sheet: sheet,
          type: type,
          item: item,
          itemIndex: itemIndex,
          editIndex: editIndex
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     .then(res => res.json())
     .catch(error => console.log('error', error))
}