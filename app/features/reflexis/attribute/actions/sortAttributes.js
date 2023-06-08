export const SORT_ATTRIBUTES = 'REFLEXIS/ATTRIBUTES/SORT_ATTRIBUTES';

export function sortAttributes(sort) {
  return {
    type: SORT_ATTRIBUTES,
    payload: sort,
  };
}
