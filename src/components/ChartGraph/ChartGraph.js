import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';

const ChartGraph = ({ dataset, colors }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let _labels = [];
    let _data = [];

    dataset.forEach(item => {
        _labels.push(item.label);
        _data.push(item.data);
    })

    const data = {
        labels: _labels,
        datasets: [
          {
            data: _data,
            backgroundColor: !colors ? [
              'rgba(0, 250, 0, .3)',
              'rgba(250, 0, 0, .3)',
            ] : 
            [
              'rgba(0, 250, 0, .3)',
              'rgba(0, 125, 250, 0.3)',
              'rgba(250, 250, 0, 0.3)',
              'rgba(0, 246, 250, 0.3)',
              'rgba(250, 104, 0, 0.3)',
              'rgba(250, 0, 0, 0.3)',
              'rgba(250, 0, 250, 0.3)',
              'rgba(62, 0, 250, 0.3)',
            ],
            borderWidth: 0,
          },
        ],
      };

    const options =  {
        plugins: {
          legend: {
            labels: {
              color: "white", 
            }
          }
        }
    }

    return <Pie data={data} options={options} />
}

export default ChartGraph;