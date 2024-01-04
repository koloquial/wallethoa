export const getGraphData = ({title, array, content}) => {
    let data = {};

    //organize into key (label) value pairs
    array.forEach(item => {
       if(data[item.type]){
           data[item.type] += Number(item.amount).toFixed(2);
       }else{
           data[item.type] = Number(item.amount).toFixed(2);
       }
    })

    let graph = [];
    for(let key in data){
        graph.push({label: key, data: data[key]})
    }

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
            value: `$${totalReceived}` 
        })
        content = temp;
    }

    let res = {
        title: title,
        content: content,
        graph: graph
    }

    return res;
}