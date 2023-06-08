export const PAGE_STANDARDS_LIST = 'PAGE_STANDARDS_LIST';

export function pageStandardsList(skip) {
  return {
    type: PAGE_STANDARDS_LIST,
    payload: skip,
  };
}
