'use client';

import {useState} from 'react';
import useSWR from 'swr';
import { WeatherHeadline } from './components/WeatherHeadline';


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

  const { data, error, isLoading } = useSWR('https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&hourly=temperature_2m,dew_point_2m,apparent_temperature&timezone=auto', fetcher)

  if (longitude === null || latitude === null) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-inherit p-6">
        <div className="mr-6 flex flex-shrink-0 items-center">
          <button className="p-4 bg-rose-600 rounded-full text-white" onClick={askLocation}>Get Location</button>
        </div>
      </main>
    );
  }
  else if (error) {
    return (
      <p>Failed to load</p>
    );
  }
  else if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-inherit p-6">
        <svg className="anime-spin h-10, w-10 mr-3"></svg>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-inherit p-6">
      <WeatherHeadline wmoCode={71} temperature={71} apparentTemperature={71} />
      <div className="mx-auto flex max-w-sm items-center bg-black p-6 shadow-lg">
        <p className="text-white">Longitude: {longitude}, Latitude: {latitude}</p>
      </div>
    </main>
  );
}