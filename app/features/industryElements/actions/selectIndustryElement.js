export const SELECT_INDUSTRY_ELEMENT = 'SELECT_INDUSTRY_ELEMENT';

export function selectIndustryElement(id, selected) {
  return {
    type: SELECT_INDUSTRY_ELEMENT,
    payload: {id, selected},
  };
}
