const getActive = (json, active, setActive) => {
    for(let i = 0; i < json.sheets.length; i++){
        if(json.sheets[i].name === active.name){
            setActive(json.sheets[i]);
            break;
        }
    }
}

export default getActive;
