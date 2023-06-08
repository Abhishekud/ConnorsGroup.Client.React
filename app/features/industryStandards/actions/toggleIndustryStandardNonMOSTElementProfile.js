export const TOGGLE_INDUSTRY_STANDARD_NON_MOST_ELEMENT_PROFILE = 'TOGGLE_INDUSTRY_STANDARD_NON_MOST_ELEMENT_PROFILE';

export function toggleIndustryStandardNonMOSTElementProfile(id) {
  return {
    type: TOGGLE_INDUSTRY_STANDARD_NON_MOST_ELEMENT_PROFILE,
    payload: id,
  };
}
