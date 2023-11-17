export const calculatePaceAdjustment = (temperature: number, dewPoint: number) => {
  // http://maximumperformancerunning.blogspot.com/2013/07/temperature-dew-point.html
  const summedMeasure = temperature + dewPoint;
  if (summedMeasure <= 100) {
    return 0
  }
  else if (100 < summedMeasure && summedMeasure <= 110) {
    return 0.5
  }
  else if (110 < summedMeasure && summedMeasure <= 120) {
    return 1.0
  }
  else if (120 < summedMeasure && summedMeasure <= 130) {
    return 2.0
  }
  else if (130 < summedMeasure && summedMeasure <= 140) {
    return 3.0
  }
  else if (140 < summedMeasure && summedMeasure <= 150) {
    return 4.5
  }
  else if (150 < summedMeasure && summedMeasure <= 160) {
    return 6.0
  }
  else if (160 < summedMeasure && summedMeasure <= 170) {
    return 8.0
  }
  else if (170 < summedMeasure && summedMeasure <= 180) {
    return 10.0
  }
  else {
    return 100.0
  }
}