export const TOGGLE_MOST_ELEMENT_STATUS_LOG_COMMENT = 'TOGGLE_MOST_ELEMENT_STATUS_LOG_COMMENT';

export function toggleMOSTElementStatusLogComment(commentId) {
  return {
    type: TOGGLE_MOST_ELEMENT_STATUS_LOG_COMMENT,
    payload: {commentId},
  };
}
