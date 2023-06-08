export const SET_INDUSTRY_STANDARDS_FILTER_PROPERTY = 'SET_INDUSTRY_STANDARDS_FILTER_PROPERTY';

export function setIndustryStandardsFilterProperty(name, value) {
  return {
    type: SET_INDUSTRY_STANDARDS_FILTER_PROPERTY,
    payload: {name, value},
  };
}
