export const getAccount = async (uid) => {
    return await fetch(`http://localhost:5000/users/${uid}`)
        .then(res => res.json(res))
        .catch(err => console.log('err', err))
}