export const addHOA = async ( uid, name) => {
    return await fetch(`http://localhost:5000/users/update/hoa-name`, {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            name: name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}