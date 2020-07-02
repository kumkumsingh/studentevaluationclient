import React, {useState, useEffect} from 'react';
import Navigation from '../Authorization/Navigation';
import {Bar} from 'react-chartjs-2';
import BatchService from '../../service/BatchService';

export default function ProgressBarChart(props) {
  const batchId = props.match.params.batchId;
  const [progress, setProgress] = useState([]);
  useEffect(() => {
    const service = new BatchService();
    service
      .getProgressBarDetails(batchId)
      .then((resp) => {
        if (resp) {
          setProgress(resp);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  const barChart = progress[0] ? (
    <Bar
      data={{
        labels: ['Red', 'Green', 'Yellow'],
        datasets: [
          {
            label: 'Percentage Of Students rated Red, Green , Yellow',
            backgroundColor: [
              'rgba(255, 0, 0,0.5)',
              'rgba(0, 255 , 0,0.5)',
              'rgba(255, 255 , 0 ,1)',
            ],
            data: [progress[0].Red, progress[1].Green, progress[2].Yellow],
          },
        ],
      }}
      options={{
        legend: {display: false},
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {display: true, text: `Progress For students in a Batch`},
      }}
    />
  ) : null;
  return (
    <div>
      {/* <Navigation {...props}/> */}
      {progress[0] ? barChart : null}
    </div>
  );
}
