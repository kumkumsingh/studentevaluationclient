import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import BatchService from '../../service/BatchService';
import "./EvaluationChart.css"

export default function EvaluationChart(props) {
  const [evaluation, setEvaluation] = useState([]);
  useEffect(() => {
    const service = new BatchService();
    service
      .getEvaluationChartDetails(props.batchId)
      .then((resp) => {
        if (resp) {
          setEvaluation(resp);
        }
      })
      .catch((e) => console.log(e));
  }, [props]);

  const handleCloseChart = () => {
    props.setEvaluationChart(false)
  }
  const barChart = evaluation[0] ? (
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
            data: [evaluation[0].Red, evaluation[1].Green, evaluation[2].Yellow],
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
                callback: function (value) {
                  return value + ' %';
                },
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.4,
            },
          ],
        },
        title: {display: true, text: `Evaluation chart for students in a Batch`},
      }}
    />
  ) : null;
  return (
      <div className="evaluation-space">
         <img src="/delete-image.png" alt="closeChart" onClick={handleCloseChart}></img>
         {evaluation[0] ? barChart : null}
      </div>
  );
}
