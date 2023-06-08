export const SELECT_BACKGROUND_COLOR = 'SELECT_BACKGROUND_COLOR';

export function selectBackgroundColor(color) {
  return {
    type: SELECT_BACKGROUND_COLOR,
    payload: {color},
  };
}
