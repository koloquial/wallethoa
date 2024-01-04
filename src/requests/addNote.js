export const addNote = async (uid, sheet, type, item) => {
    return await fetch(`http://localhost:5000/users/add/note`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          sheet: sheet,
          type: type,
          item: item,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     .then(res => res.json())
     .catch(error => console.log('error', error))
}