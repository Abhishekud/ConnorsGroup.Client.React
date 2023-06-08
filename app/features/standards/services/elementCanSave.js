export default function (element) {
  let result = true;
  const time = element.get('measuredTimeMeasurementUnits');
  if (element.get('name') === '') result = false;
  if (element.get('frequencyFormula') === '') result = false;
  if (element.get('unitOfMeasureId') === '' || element.get('unitOfMeasureId') === null) result = false;
  if (time === '' || time === null || isNaN(time)) result = false;
  return result;
}
