
export const SELECT_ELEMENT_ACTIVITY = 'SELECT_ELEMENT_ACTIVITY';

export function selectActivity(activity) {
  return {
    type: SELECT_ELEMENT_ACTIVITY,
    payload: activity,
  };
}
