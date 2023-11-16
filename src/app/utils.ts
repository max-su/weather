export const calculatePaceAdjustment = (temperature: number, dewPoint: number) => {
  // http://maximumperformancerunning.blogspot.com/2013/07/temperature-dew-point.html
  const summedMeasure = temperature + dewPoint;
  if (summedMeasure <= 100) {
    return 0
  }
  else if (101 <= summedMeasure && summedMeasure <= 110) {
    return 0.5
  }
  else if (111 <= summedMeasure && summedMeasure <= 120) {
    return 1.0
  }
  else if (121 <= summedMeasure && summedMeasure <= 130) {
    return 2.0
  }
  else if (131 <= summedMeasure && summedMeasure <= 140) {
    return 3.0
  }
  else if (141 <= summedMeasure && summedMeasure <= 150) {
    return 4.5
  }
  else if (151 <= summedMeasure && summedMeasure <= 160) {
    return 6.0
  }
  else if (161 <= summedMeasure && summedMeasure <= 170) {
    return 8.0
  }
  else if (171 <= summedMeasure && summedMeasure <= 180) {
    return 10.0
  }
  else {
    return 100.0
  }
}