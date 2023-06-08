export const TOGGLE_NON_MOST_ELEMENT_STATUS_LOG_COMMENT = 'TOGGLE_NON_MOST_ELEMENT_STATUS_LOG_COMMENT';

export function toggleNonMOSTElementStatusLogComment(commentId) {
  return {
    type: TOGGLE_NON_MOST_ELEMENT_STATUS_LOG_COMMENT,
    payload: {commentId},
  };
}
