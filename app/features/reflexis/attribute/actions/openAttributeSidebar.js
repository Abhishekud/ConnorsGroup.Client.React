export const OPEN_ATTRIBUTE_SIDEBAR = 'REFLEXIS/ATTRIBUTES/OPEN_SIDEBAR';

export function openAttributeSidebar(model) {
  return {
    type: OPEN_ATTRIBUTE_SIDEBAR,
    payload: model,
  };
}


