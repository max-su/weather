import React from "react";

import { calculatePaceAdjustment } from '../utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';


type HourlyUnits = {
  time: string;
  temperature: string;
  dew_point_2m: string;
  precipitation_probability: string;
}

type HourlyData = {
  time: Array<string>;
  temperature_2m: Array<number>;
  dew_point_2m: Array<number>;
  precipitation_probability: Array<number>;
}

type HourData = {
  time: string;
  paceAdjustment: number;
  precipitationProbability: number;
}

interface Props {
  hourlyUnits: HourlyUnits;
  hourlyData: HourlyData;
  currentHour: string;
}

function getChartData(data: HourlyData): Array<HourData> {
  // Converts the JSON object from the API into the shape needed for the chart.
  // n == len(time) == len(temperature_2m) == len(dew_point_2m) == len(precipitation_probability)
  const res: Array<HourData> = []

  data.time.forEach((time, idx) => {
    res.push({
      time: time,
      paceAdjustment: calculatePaceAdjustment(data.temperature_2m[idx], data.dew_point_2m[idx]),
      precipitationProbability: data.precipitation_probability[idx],
    })
  })

  return res;
}

export class WeatherGraph extends React.PureComponent<Props> {
  render() {
    const {hourlyUnits, hourlyData, currentHour } = this.props
    console.log(currentHour);
    return (
      <ResponsiveContainer width="99%" height="99%" aspect={3}>
        <LineChart
          width={1500}
          height={1300}
          data={getChartData(hourlyData)}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine x={currentHour} stroke="#ffcbcb" label="Current Time"/>
          <Line type="monotone" dataKey="paceAdjustment" stroke="#dbcdf0"/>
        </LineChart>
      </ResponsiveContainer>
    );
  }

//   static demoUrl = 'https://codesandbox.io/s/line-chart-width-reference-line-edjv0';
  
//   render() {
//     return (
//       <ResponsiveContainer width="99%" height="99%" aspect={3}>
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 20,
//             right: 50,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
//           <ReferenceLine y={9800} label="Max" stroke="red" />
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
}