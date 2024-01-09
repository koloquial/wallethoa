export const addHomeOwner = async (data) => {
    return await fetch(`${process.env.REACT_APP_MONGO_DB_URI}/users/add/home-owner`, {
        method: 'POST',
        body: JSON.stringify({
            uid: data.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            phone: data.phone,
            email: data.email,
            emergName: data.emergName,
            emergPhone: data.emergPhone,
            ownership: data.ownership,
            note: data.note,
            dues: data.dues,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .catch(error => console.log('error', error))
}