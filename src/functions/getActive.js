const getActive = (json, active, setActive) => {
    console.log('JSON GET ACTIVE', json)
    console.log('ACTIVE', active);

    for(let i = 0; i < json.sheets.length; i++){
        if(json.sheets[i].name === active.name){
            console.log('SET ACTIVE', json.sheets[i]);
            setActive(json.sheets[i]);
            break;
        }
    }
}

export default getActive;
