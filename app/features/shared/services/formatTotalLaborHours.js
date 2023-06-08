/**
 * Description: Accepts totalLaborHours.
 * and returns formatted total labor hours.
 * @param {*} totalLaborHours - It contains the total labor hours.
 * @returns the formatted total labor hours.
 */

const ranges = [
  {divider: 1000000000, suffix: 'B'},
  {divider: 1000000, suffix: 'M'},
  {divider: 1000, suffix: 'K'},
];

export default function formatTotalLaborHours(totalLaborHours) {
  // To get length of digit places
  const length = Math.trunc(Math.log(totalLaborHours) * Math.LOG10E + 1);
  if (length <= 4) {
    return Math.round(totalLaborHours).toString();
  }
  for (let i = 0; i < ranges.length; i++) {
    if (totalLaborHours >= ranges[i].divider) {
      return (totalLaborHours / ranges[i].divider).toPrecision(3).toString() + ranges[i].suffix;
    }
  }
  return totalLaborHours.toString();
}
