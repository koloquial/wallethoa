import { getAccount } from './getAccount';
import { addAccount } from './addAccount';

export const assignAccounts = async (currentUser) => {
    if(currentUser){
        return await getAccount(currentUser.uid)
        .then(json => {
            console.log('check length', json)
            if(!Object.keys(json).length){
                addAccount(currentUser.uid, currentUser.email)
                .then(json => json)
            }else{
                return json;
            }
        })
        .catch(error => console.log('error', error))
    }
}