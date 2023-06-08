export const PAGE_ATTRIBUTES_LIST = 'PAGE_ATTRIBUTES_LIST';

export function pageAttributesList(skip) {
  return {
    type: PAGE_ATTRIBUTES_LIST,
    payload: skip,
  };
}
