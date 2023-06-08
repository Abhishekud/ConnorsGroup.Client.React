export const SELECT_ALL_INDUSTRY_STANDARDS = 'SELECT_ALL_INDUSTRY_STANDARDS';

export function selectAllIndustryStandards(ids, selected) {
  return {
    type: SELECT_ALL_INDUSTRY_STANDARDS,
    payload: {ids, selected},
  };
}
