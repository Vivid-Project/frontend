import React, { useEffect, useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import UserContext from '../modules/Context/UserContext';
import * as API from '../API/APIcalls';

import fakeDreams from '../data/fakeDreams';

const TonesOverTime = () => {
  const user = useContext(UserContext);
  const [allDreams, setAllDreams] = useState(fakeDreams.dreams);
  const [graphData, setGraphData] = useState({ x: [], y: [] });
  const [chartDayCount, setChartCount] = useState(30);
  const [chartDates, setChartDates] = useState([]);

  useEffect(() => {
    buildChartDates();
    processDreamData();
    // API.fetchUserDreams(user.token).then((r) => {
    //   setAllDreams(r);
    // });
  }, [chartDayCount]);

  const getDateToday = (dayModifier) => {
    const date = new Date();
    if (dayModifier) {
      date.setDate(date.getDate() + dayModifier);
    }
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };

  const buildChartDates = () => {
    let day = 0;
    const daysOfWeek = [];
    while (daysOfWeek.length < chartDayCount) {
      daysOfWeek.push(getDateToday(day));
      day--;
    }
    setChartDates(daysOfWeek);
  };

  const buildToneValues = (toneData) => {
    // const values = chartDates.reduce((dateValues, date) => {
    //   if (!toneData[date]) {
    //     toneData[date] = 0;
    //   }
    //   return dateValues.push(toneData[date]);
    // }, []);
    // console.log(values);
  };

  const processDreamData = () => {
    const toneDatesAndFreqs = allDreams.reduce((toneFreqs, dream) => {
      Object.entries(dream.toneAnalysis.tone_strength).forEach((tonePair) => {
        let tone = tonePair[0];
        let freq = tonePair[1];
        if (!toneFreqs[tone]) {
          toneFreqs[tone] = { [dream.date]: 0 };
        }
        if (!toneFreqs[tone][dream.date]) {
          toneFreqs[tone][dream.date] = 0;
        }
        toneFreqs[tone][dream.date] += freq;
      });

      return toneFreqs;
    }, {});
    console.log(toneDatesAndFreqs);
    buildToneValues(toneDatesAndFreqs.Analytical);
  };

  const data = {
    labels: chartDates,
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return <Line data={data} />;
};

export default TonesOverTime;
