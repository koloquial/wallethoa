export const addIncomeType = async ( uid, type) => {
    return await fetch(`http://localhost:5000/users/add/income-type`, {
            method: 'POST',
            body: JSON.stringify({
              uid:uid,
              type: type
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .catch(error => console.log('error', error))
}