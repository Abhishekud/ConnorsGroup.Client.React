export const TOGGLE_STANDARD_STATUS_LOG_COMMENT = 'TOGGLE_STANDARD_STATUS_LOG_COMMENT';

export function toggleStandardStatusLogComment(commentId) {
  return {
    type: TOGGLE_STANDARD_STATUS_LOG_COMMENT,
    payload: {commentId},
  };
}
