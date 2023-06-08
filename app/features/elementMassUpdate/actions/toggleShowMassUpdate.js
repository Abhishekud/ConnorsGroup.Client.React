export const TOGGLE_SHOW_ELEMENT_MASS_UPDATE = 'TOGGLE_SHOW_ELEMENT_MASS_UPDATE';

export function toggleShowMassUpdate(elementType) {
  return {
    type: TOGGLE_SHOW_ELEMENT_MASS_UPDATE,
    payload: elementType,
  };
}
