export const FILTER_STORE_ATTRIBUTES = 'REFLEXIS/INTEGRATION_STATUS/FILTER_STORE_ATTRIBUTES';

export function filterStoreAttributes(filter) {
  return {
    type: FILTER_STORE_ATTRIBUTES,
    payload: filter,
  };
}
