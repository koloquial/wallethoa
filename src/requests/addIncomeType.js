export const addIncomeType = async ( uid, type) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/income-type`, {
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