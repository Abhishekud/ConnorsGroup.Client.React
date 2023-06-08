export const SELECT_INDUSTRY_ALLOWANCE = 'SELECT_INDUSTRY_ALLOWANCE';

export function selectIndustryAllowance(id, selected) {
  return {
    type: SELECT_INDUSTRY_ALLOWANCE,
    payload: {id, selected},
  };
}
