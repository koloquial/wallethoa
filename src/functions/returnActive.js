const getActive = (json, active) => {
    for(let i = 0; i < json.sheets.length; i++){
        if(json.sheets[i].name === active.name){
            return json.sheets[i];
        }
    }
}

export default getActive;
