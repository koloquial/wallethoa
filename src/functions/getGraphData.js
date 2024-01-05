export const getGraphData = ({title, array, content}) => {
    let data = {};

    //prganized into key value pairs
    array.forEach(item => {
       if(data[item.type]){
           data[item.type] += parseFloat(item.amount).toFixed(2);
       }else{
           data[item.type] = parseFloat(item.amount).toFixed(2);
       }
    })

    //create graph data
    let graph = [];
    for(let key in data){
        graph.push({label: key, data: data[key]})
    }

    //check to see if content was generated
    //if not - generate content for overview
    let temp = [];
    if(!content){
        let totalReceived = 0;
        graph.forEach(item => {
            if(totalReceived === 0){
                totalReceived = parseFloat(item.data).toFixed(2);
            }else{
                totalReceived = parseFloat(totalReceived) + parseFloat(item.data);
            }
            temp.push({
                label: `Total ${item.label} Received`,
                value: `$${parseFloat(item.data).toFixed(2)}`
            })
        })
        temp.unshift({
            label: 'Total Received',
            value: `$${parseFloat(totalReceived).toFixed(2)}` 
        })
        content = temp;
    }

    return {
        title: title,
        content: content,
        graph: graph
    };
}