'use client';

import Image from "next/image";
import {useState} from 'react';
import SunnyDay from "../assets/day.svg";

export default function Home() {
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

  if (longitude === null || latitude === null) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-inherit p-6">
        <div className="mr-6 flex flex-shrink-0 items-center">
          <button className="p-4 bg-rose-600 rounded-full text-white" onClick={askLocation}>Get Location</button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-inherit p-6">
      <div className="mx-auto flex max-w-sm items-center bg-black p-6 shadow-lg">
        <Image src={SunnyDay} width={128} height={128} alt="Sunny Day" />
        <div className="-ml-5">
          <div className="text-5xl font-medium text-white">71°F</div>
          <div className="text-sm font-medium text-white">Feels 71°F</div>
        </div>
      </div>
      <div className="mx-auto flex max-w-sm items-center bg-black p-6 shadow-lg">
        <p className="text-white">Longitude: {longitude}, Latitude: {latitude}</p>
      </div>
    </main>
  );
}