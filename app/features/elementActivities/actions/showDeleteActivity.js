export const SHOW_DELETE_ELEMENT_ACTIVITY = 'SHOW_DELETE_ELEMENT_ACTIVITY';

export function showDeleteActivity(activity) {
  return {
    type: SHOW_DELETE_ELEMENT_ACTIVITY,
    payload: activity,
  };
}
