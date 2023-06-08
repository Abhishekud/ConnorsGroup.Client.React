import {formatTotalLaborHours} from '../services';
const {describe, test, expect} = global;


describe('Test total labor hours format', () => {
  const testData = [
    //[totalLaborHours,expected]
    [1, '1'],
    [17, '17'],
    [171, '171'],
    [1715, '1715'],
    [17150, '17.1K'],
    [171506, '172K'],
    [1715067, '1.72M'],
    [17150679, '17.2M'],
    [171506792, '172M'],
    [1715067923, '1.72B'],
    [17150679237, '17.2B'],
    [171506792371, '172B'],
  ];
  // When using test.each, the data must be an array of arrays (Table).
  test.each(testData)('Verify if total labor hours %i is formatted correctly to %s ', (totalLaborHours, expected) => {
    expect(formatTotalLaborHours(totalLaborHours)).toBe(expected);
  });
});
