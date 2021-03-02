import React, { useEffect, useContext, useState } from 'react';
import { Line, Polar } from 'react-chartjs-2';
import UserContext from '../modules/Context/UserContext';
import * as API from '../API/APIcalls';
import { Typography, MenuItem, FormControl, Select } from '@material-ui/core';

const TonesOverTime = () => {
  const user = useContext(UserContext);
  const [allDreams, setAllDreams] = useState(null);
  const [chartDayCount, setChartDayCount] = useState(14);
  const [chartDates, setChartDates] = useState(null);
  const [chartTones, setChartTones] = useState([]);
  const [chartPlotDatasets, setChartPlotDatasets] = useState([]);
  const [polarChartDatasets, setPolarChartDatasets] = useState([]);
  const chartColors = [
    '#FFF2CF',
    '#FCE39E',
    '#FDD870',
    '#FCCB41',
    '#FDBF11',
    '#E88E2D',
    '#CA5800',
    '#843215',
  ];

  useEffect(() => {
    buildChartDates();
  }, [chartDayCount]);

  useEffect(() => {
    if (!chartDates) return;
    API.fetchUserDreamsByDates(
      user.token,
      getDateToday(-chartDayCount),
      getDateToday()
    ).then((r) => {
      // TODO: Remove cl when no longer needed
      console.log(r);
      cleanAndStoreData(r);
    });
  }, [chartDates]);

  useEffect(() => {
    if (!allDreams) return;
    processDreamData();
    createPlotChartDatasets();
    createPolarChartDatasets();
  }, [allDreams]);

  const cleanAndStoreData = (responses) => {
    const cleanedData = responses.map((response) => {
      return {
        date: response.date,
        toneAnalysis: response.toneAnalysis,
      };
    });
    setAllDreams(cleanedData);
  };

  const handleChange = (event) => {
    setChartDayCount(event.target.value);
    setChartTones([]);
  };

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
      daysOfWeek.unshift(getDateToday(day));
      day--;
    }
    setChartDates(daysOfWeek);
  };

  const createIndividualToneData = (tone, toneData) => {
    const toneDates = chartDates.reduce((dateValues, date) => {
      if (!toneData[date]) {
        toneData[date] = 0;
      }
      dateValues.push(toneData[date]);
      return dateValues;
    }, []);
    setChartTones(chartTones.push({ [tone]: toneDates }));
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
    Object.keys(toneDatesAndFreqs).forEach((tone) =>
      createIndividualToneData(tone, toneDatesAndFreqs[tone])
    );
  };

  const selectColor = (tone) => {
    let i = chartTones.indexOf(tone);
    if (i >= chartColors.length) {
      i = Math.floor(Math.random() * chartColors.length);
    }
    return chartColors[i];
  };

  const createPlotChartDatasets = () => {
    const chartPlotData = chartTones.map((tone) => {
      return {
        label: Object.keys(tone)[0],
        fill: false,
        lineTension: 0.15,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: selectColor(tone),
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

  const createPolarChartDatasets = () => {
    const polarData = chartTones.reduce(
      (datasets, tone) => {
        let toneName = Object.keys(tone)[0];
        let toneCounts = Object.values(tone)[0];
        let toneSum = toneCounts.reduce(
          (totalSum, number) => totalSum + number,
          0
        );
        datasets.data.push(toneSum);
        datasets.labels.push(toneName);
        return datasets;
      },
      { data: [], labels: [] }
    );
    setPolarChartDatasets(polarData);
    console.log(polarData);
  };

  const polarChartInfo = {
    data: {
      datasets: [
        {
          data: polarChartDatasets.data,
          backgroundColor: chartColors,
          label: 'Emotion Count',
        },
      ],
      labels: polarChartDatasets.labels,
    },
    options: {
      legend: {
        display: false,
        labels: { fontColor: 'floralwhite', boxWidth: 30 },
      },
      animation: { animateScale: true },
    },
  };

  const lineChartInfo = {
    data: { labels: chartDates, datasets: chartPlotDatasets },
    options: {
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      legend: {
        position: 'bottom',
        labels: { fontColor: 'floralwhite', boxWidth: 20 },
      },
    },
  };

  return (
    <>
      <Typography>Your dreams over the past</Typography>
      <span>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chartDayCount}
            onChange={handleChange}
            style={{ color: 'white' }}
          >
            <MenuItem value={7}>Week</MenuItem>
            <MenuItem value={14}>Two Weeks</MenuItem>
            <MenuItem value={30}>Month</MenuItem>
          </Select>
        </FormControl>
      </span>
      <Line data={lineChartInfo.data} options={lineChartInfo.options} />
      <Typography>Emotion Tags</Typography>

      <Polar data={polarChartInfo.data} options={polarChartInfo.options} />
    </>
  );
};

export default TonesOverTime;
