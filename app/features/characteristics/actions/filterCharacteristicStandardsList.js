
export const FILTER_CHARACTERISTIC_STANDARDS_LIST = 'FILTER_CHARACTERISTIC_STANDARDS_LIST';

export function filterCharacteristicStandardsList(filter) {
  return {
    type: FILTER_CHARACTERISTIC_STANDARDS_LIST,
    payload: {filter},
  };
}
