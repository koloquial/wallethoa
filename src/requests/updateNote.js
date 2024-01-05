export const updateNote = async (uid, sheet, type, item, itemIndex, editIndex) => {
    return await fetch(`http://localhost:5000/users/update/note`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          sheet: sheet,
          type: type,
          item: item,
          depositIndex: itemIndex,
          noteIndex: editIndex
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     .then(res => res.json())
     .catch(error => console.log('error', error))
}