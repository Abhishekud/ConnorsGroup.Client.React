export const SELECT_ALL_INDUSTRY_ELEMENTS = 'SELECT_ALL_INDUSTRY_ELEMENTS';

export function selectAllIndustryElements(selected) {
  return {
    type: SELECT_ALL_INDUSTRY_ELEMENTS,
    payload: {selected},
  };
}
