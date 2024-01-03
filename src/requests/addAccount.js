export const addAccount = async ( uid, email ) => {
    return await fetch(`http://localhost:5000/users/add-account`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            uid: uid,
            admin: email
        })
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}