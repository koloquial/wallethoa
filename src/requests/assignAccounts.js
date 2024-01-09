import { getAccount } from './getAccount';
import { addAccount } from './addAccount';

export const assignAccounts = async (currentUser) => {
    if(currentUser){
        return await getAccount(currentUser.uid)
        .then(json => {
            if(!Object.keys(json).length){
                return addAccount(currentUser.uid, currentUser.email)
                .then(json => json)
            }else{
                return json;
            }
        })
        .catch(error => console.log('error', error))
    }
}