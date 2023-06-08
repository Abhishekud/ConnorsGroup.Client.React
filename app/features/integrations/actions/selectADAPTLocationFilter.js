export const SELECT_ADAPT_LOCATION_FILTER = 'SELECT_ADAPT_LOCATION_FILTER';

export function selectADAPTLocationFilter(locationFilter) {
  return {
    type: SELECT_ADAPT_LOCATION_FILTER,
    payload: {locationFilter},
  };
}

export default selectADAPTLocationFilter;
