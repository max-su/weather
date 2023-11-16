import internal from "stream";
import Image from "next/image";
import SunnyIcon from "../../assets/day.svg";
import CloudyIcon from "../../assets/cloudy.svg";
import SnowyIcon from "../../assets/snowy-1.svg";
import RainyIcon from '../../assets/rainy-1.svg';
import { calculatePaceAdjustment } from '../utils';
import React from "react";

interface Props {
  wmoCode: number
  temperature: number
  apparentTemperature: number
  dewPoint: number
}
export const WeatherHeadline: React.FC<Props> = ({wmoCode, temperature, apparentTemperature, dewPoint}) => {
  // 0 -> 2 Sunny
  // 3 -> 20 Cloudy
  // 20 -> 29 Rain just before, can call cloudy?
  // 30 -> 35 Sandstorm
  // 36 -> 39 Snow
  // 40 -> 49 Fog
  // 50 -> 59 Drizzle
  // 60 -> 69 Rainy
  // 70 -> 79 Snow
  // 80 -> 99 Rain
  // https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
  let imgIcon = null;
  if (0 <= wmoCode && wmoCode <= 2) {
    imgIcon = <Image src={SunnyIcon} width={128} height={128} alt="Sunny Day" />;
  }
  else if (3 <= wmoCode && wmoCode <= 29) {
    imgIcon = <Image src={CloudyIcon} width={128} height={128} alt="Cloudy Day" />;
  }
  else if (30 <= wmoCode && wmoCode <= 35) {
    imgIcon = <Image src={"https://worldweather.wmo.int/images/1.png"} width={128} height={128} alt="Sandstorm" />;
  }
  else if ((36 <= wmoCode && wmoCode <= 39) || (70 <= wmoCode && wmoCode <= 79)) {
    imgIcon = <Image src={SnowyIcon} width={128} height={128} alt="Snowy Day" />;
  }
  else if (40 <= wmoCode && wmoCode <= 49) {
    imgIcon = <Image src={"https://worldweather.wmo.int/images/16.png"} width={128} height={128} alt="Foggy Day" />;
  }
  else if ((50 <= wmoCode && wmoCode <= 69) || (80 <= wmoCode && wmoCode <= 99)) {
    imgIcon = <Image src={RainyIcon} width={128} height={128} alt="Rainy Day" />
  }
  else if (70 <= wmoCode && wmoCode <= 79) {
    imgIcon = <Image src={SnowyIcon} width={128} height={128} alt="Snowy Day" />
  }

  const paceAdjustmentRate = calculatePaceAdjustment(temperature, dewPoint);

  return (
    <div className="mx-auto flex max-w-sm items-center bg-black p-6 shadow-lg">
      {imgIcon}
      <div className="-ml-5">
        <div className="text-5xl font-medium text-white">{temperature}°F</div>
        <div className="text-sm font-medium text-white">Feels {apparentTemperature}°F</div>
        <div className="text-sm font-medium text-white">Dew Point: {dewPoint}°F</div>
        <div className="text-sm font-medium text-white">{paceAdjustmentRate === 100.0 ? "Running not recommended" : `Adjust running by ${paceAdjustmentRate}%`} </div>
      </div>
    </div>
  );
}