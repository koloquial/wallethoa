export const addSheet = async (uid, name, balance) => {
    return await fetch(`http://localhost:5000/users/add/sheet`, {
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