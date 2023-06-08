export const PAGE_CHARACTERISTIC_STANDARDS_LIST = 'PAGE_CHARACTERISTIC_STANDARDS_LIST';

export function pageCharacteristicStandardsList(skip) {
  return {
    type: PAGE_CHARACTERISTIC_STANDARDS_LIST,
    payload: skip,
  };
}
