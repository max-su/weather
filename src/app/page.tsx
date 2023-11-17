'use client';

import {useState} from 'react';
import useSWR from 'swr';
import { WeatherHeadline } from './components/WeatherHeadline';
import { WeatherGraph } from './components/WeatherGraph';


export default function Home() {
  // Geolocation
  const [longitude, setLongitude] = useState<number | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  
  const askLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      setLongitude(long);
      setLatitude(lat);
    })
  };

  // SWR 
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  let url = new URL('https://api.open-meteo.com/v1/forecast')
  // Technical Debt!
  // searchParams encodes all character commas which is not the desired behavior
  // https://stackoverflow.com/a/73558274
  let current_values = ['temperature', 'dew_point_2m', 'apparent_temperature', 'weather_code']
  url.searchParams.set('current','CURRENT_PLACEHOLDER')
  // let hourly_values = ['temperature_2m','dew_point_2m','apparent_temperature','precipitation_probability','precipitation','rain','showers','snowfall','snow_depth','weather_code','cloud_cover']
  let hourly_values = ['temperature_2m','dew_point_2m','precipitation_probability']  
  url.searchParams.set('hourly', 'HOURLY_PLACEHOLDER')
  url.searchParams.set('temperature_unit', 'fahrenheit')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '1')

  if (latitude && longitude && url.searchParams.get('latitude') !== latitude.toString() && url.searchParams.get('longitude') !== longitude.toString()) {
    url.searchParams.set('latitude', latitude.toString())
    url.searchParams.set('longitude', longitude.toString())
  }
  
  // const { data, error, isLoading } = useSWR(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`, fetcher)
  const { data, error, isLoading } = useSWR(url.toString().replace('CURRENT_PLACEHOLDER', current_values.join(',')).replace('HOURLY_PLACEHOLDER', hourly_values.join(',')), fetcher, {refreshInterval: 900000, shouldRetryOnError: false})


  let body = null;
  if (longitude === null || latitude === null) {
    body = (
      <div className="mr-6 flex flex-shrink-0 items-center">
        <button className="p-4 bg-rose-600 rounded-full text-white items-center" onClick={askLocation}>Get Location</button>
      </div>
    );
    return (
      <main className="flex min-h-screen flex-col bg-inherit items-center p-6">
        {body}
      </main>
    );
  }
  else if (error) {
    body = (
      <p>Failed to load</p>
    );
  }
  else if (isLoading) {
    body = (
      <svg className="anime-spin h-10, w-10 mr-3"></svg>
    );
  }
  else {
    body = (
      <div className="place-items-flex">
        <div className="mx-auto flex max-w-sm bg-black p-6 shadow-lg">
          <WeatherHeadline wmoCode={data.current.weather_code} temperature={data.current.temperature} apparentTemperature={data.current.apparent_temperature} dewPoint={data.current.dew_point_2m} />
        </div>
        <div className="mx-auto min-h-full max-h-full max-w-8xl min-w-8xl bg-black p-6 shadow-lg">
          <WeatherGraph hourlyUnits={data.hourly_units} hourlyData={data.hourly} currentHour={`${data.current.time.substring(0, data.current.time.length - 3)}:00`}/>
        </div>
        <div className="mx-auto max-w-sm flex bg-black p-6 shadow-lg items-center">
          <p className="text-white items-center">Longitude: {longitude}, Latitude: {latitude}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-inherit p-6">
      {body}
    </main>
  );
}