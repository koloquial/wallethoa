const getActive = (json, active) => {
    console.log('JSON', json);
    console.log('COMPARE', active);
    for(let i = 0; i < json.sheets.length; i++){
        if(json.sheets[i].name === active.name){
            console.log('found sheet', json.sheets[i])
            return json.sheets[i];
        }
    }
}

export default getActive;
