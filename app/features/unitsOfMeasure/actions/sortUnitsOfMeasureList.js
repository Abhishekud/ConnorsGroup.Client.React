export const SORT_UNITS_OF_MEASURE_LIST = 'SORT_UNITS_OF_MEASURE_LIST';

export function sortUnitsOfMeasureList(sort) {
  return {
    type: SORT_UNITS_OF_MEASURE_LIST,
    payload: sort,
  };
}
