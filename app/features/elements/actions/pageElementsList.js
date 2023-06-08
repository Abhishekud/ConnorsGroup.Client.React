export const PAGE_ELEMENTS_LIST = 'PAGE_ELEMENTS_LIST';

export function pageElementsList(skip) {
  return {
    type: PAGE_ELEMENTS_LIST,
    payload: skip,
  };
}
