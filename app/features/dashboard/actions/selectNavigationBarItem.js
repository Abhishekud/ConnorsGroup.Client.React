export const SELECT_NAVIGATION_BAR_ITEM = 'SELECT_NAVIGATION_BAR_ITEM';

export function selectNavigationBarItem(value) {
  return {
    type: SELECT_NAVIGATION_BAR_ITEM,
    payload: value,
  };
}
