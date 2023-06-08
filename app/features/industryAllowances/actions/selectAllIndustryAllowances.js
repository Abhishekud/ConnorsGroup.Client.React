export const SELECT_ALL_INDUSTRY_ALLOWANCES = 'SELECT_ALL_INDUSTRY_ALLOWANCES';

export function selectAllIndustryAllowances(ids, selected) {
  return {
    type: SELECT_ALL_INDUSTRY_ALLOWANCES,
    payload: {ids, selected},
  };
}
