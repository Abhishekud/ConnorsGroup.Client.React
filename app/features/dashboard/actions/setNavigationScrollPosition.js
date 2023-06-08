export const SET_NAVIGATION_BAR_SCROLL_POSITION = 'SET_NAVIGATION_BAR_SCROLL_POSITION';

export function setNavigationScrollPosition(position) {
  return {
    type: SET_NAVIGATION_BAR_SCROLL_POSITION,
    payload: position,
  };
}
