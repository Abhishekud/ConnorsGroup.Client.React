export const PAGE_CHARACTERISTICS_LIST = 'PAGE_CHARACTERISTICS_LIST';

export function pageCharacteristicsList(skip) {
  return {
    type: PAGE_CHARACTERISTICS_LIST,
    payload: skip,
  };
}
