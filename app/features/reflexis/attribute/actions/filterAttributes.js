export const FILTER_ATTRIBUTES = 'REFLEXIS/ATTRIBUTES/FILTER_ATTRIBUTES';

export function filterAttributes(filter) {
  return {
    type: FILTER_ATTRIBUTES,
    payload: filter,
  };
}

