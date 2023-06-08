export const LINK_VISITED = 'LINK_VISITED';

export function linkVisited(requestId) {
  return {
    type: LINK_VISITED,
    payload: requestId,
  };
}
