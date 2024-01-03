export const deleteIncomeType = async ( uid, index ) => {
    return await fetch(`http://localhost:5000/users/delete/income-type`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          index: index
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}