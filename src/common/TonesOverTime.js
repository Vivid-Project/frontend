import React, { useEffect, useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import UserContext from '../modules/Context/UserContext';
import * as API from '../API/APIcalls';

import fakeDreams from '../data/fakeDreams';
import fakeUser from '../data/fakeUser';

const TonesOverTime = () => {
  const user = useContext(UserContext);
  const [allDreams, setAllDreams] = useState(null);
  const [chartDayCount, setChartCount] = useState(70);
  const [chartDates, setChartDates] = useState(null);
  const [chartTones, setChartTones] = useState([]);
  const [chartPlotDatasets, setChartPlotDatasets] = useState([]);

  useEffect(() => {
    buildChartDates();
  }, [chartDayCount]);

  useEffect(() => {
    if (!chartDates) return;
    API.fetchUserDreamsByDates(
      user.token,
      chartDates[chartDates.length - 1],
      chartDates[0]
    ).then((r) => {
      setAllDreams(r);
      console.log(r);
    });
  }, [chartDates]);

  useEffect(() => {
    if (!allDreams) return;
    processDreamData();
    createPlotChartDatasets();
  }, [allDreams]);

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

  const createIndividualToneData = (tone, toneData) => {
    const toneDates = chartDates.reduce((dateValues, date) => {
      if (!toneData[date]) {
        toneData[date] = 0;
      }
      dateValues.unshift(toneData[date]);
      return dateValues;
    }, []);
    setChartTones(chartTones.push({ [tone]: toneDates }));
  };

  const buildToneValues = (toneData) => {
    Object.keys(toneData).forEach((tone) =>
      createIndividualToneData(tone, toneData[tone])
    );
  };

  const processDreamData = () => {
    const toneDatesAndFreqs = allDreams.reduce((toneFreqs, dream) => {
      Object.entries(dream.toneAnalysis.tone_strength).forEach((tonePair) => {
        let tone = tonePair[0];
        let freq = tonePair[1];

        if (!toneFreqs[tone]) {
          toneFreqs[tone] = {};
        }

        if (!toneFreqs[tone][dream.date]) {
          toneFreqs[tone][dream.date] = 0;
        }

        toneFreqs[tone][dream.date] += freq;
      });

      return toneFreqs;
    }, {});
    buildToneValues(toneDatesAndFreqs);
  };

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createPlotChartDatasets = () => {
    const chartPlotData = chartTones.map((tone) => {
      return {
        label: Object.keys(tone),
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: getRandomColor(),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: Object.values(tone)[0],
      };
    });
    setChartPlotDatasets(chartPlotData);
  };

  const data = {
    labels: chartDates,
    datasets: chartPlotDatasets,
  };

  return <Line data={data} />;
};

export default TonesOverTime;
