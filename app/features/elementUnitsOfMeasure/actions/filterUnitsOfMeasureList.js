export const FILTER_ELEMENT_UNITS_OF_MEASURE_LIST = 'FILTER_ELEMENT_UNITS_OF_MEASURE_LIST';

export function filterUnitsOfMeasureList(filter) {
  return {
    type: FILTER_ELEMENT_UNITS_OF_MEASURE_LIST,
    payload: (filter),
  };
}
