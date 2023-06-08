export const SELECT_INDUSTRY_STANDARD = 'SELECT_INDUSTRY_STANDARD';

export function selectIndustryStandard(id, selected) {
  return {
    type: SELECT_INDUSTRY_STANDARD,
    payload: {id, selected},
  };
}
