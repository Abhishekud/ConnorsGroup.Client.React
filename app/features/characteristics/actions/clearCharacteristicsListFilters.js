export const CLEAR_CHARACTERISTICS_LIST_FILTERS = 'CLEAR_CHARACTERISTICS_LIST_FILTERS';
export const CLEAR_CHARACTERISTICS_LIST_FILTERS_PENDING = `${CLEAR_CHARACTERISTICS_LIST_FILTERS}_PENDING`;
export const CLEAR_CHARACTERISTICS_LIST_FILTERS_FULFILLED = `${CLEAR_CHARACTERISTICS_LIST_FILTERS}_FULFILLED`;
export const CLEAR_CHARACTERISTICS_LIST_FILTERS_REJECTED = `${CLEAR_CHARACTERISTICS_LIST_FILTERS}_REJECTED`;

export function clearCharacteristicsListFilters() {
  return {
    type: CLEAR_CHARACTERISTICS_LIST_FILTERS,
    payload: Promise.resolve(),
  };
}
