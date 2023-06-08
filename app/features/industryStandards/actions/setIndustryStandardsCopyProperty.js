export const SET_INDUSTRY_STANDARDS_COPY_PROPERTY = 'SET_INDUSTRY_STANDARDS_COPY_PROPERTY';

export function setIndustryStandardsCopyProperty(name, value) {
  return {
    type: SET_INDUSTRY_STANDARDS_COPY_PROPERTY,
    payload: {name, value},
  };
}
