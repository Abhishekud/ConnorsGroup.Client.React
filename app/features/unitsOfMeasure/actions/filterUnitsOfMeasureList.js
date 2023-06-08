export const FILTER_UNITS_OF_MEASURE_LIST = 'FILTER_UNITS_OF_MEASURE_LIST';

export function filterUnitsOfMeasureList(filter) {
  return {
    type: FILTER_UNITS_OF_MEASURE_LIST,
    payload: filter,
  };
}
