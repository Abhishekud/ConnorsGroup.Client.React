export const REGISTER_NON_MOST_STEP_SCROLL_NODE = 'REGISTER_NON_MOST_STEP_SCROLL_NODE';

export function registerNonMOSTStepScrollNode(nodeId, node) {
  return {
    type: REGISTER_NON_MOST_STEP_SCROLL_NODE,
    payload: {nodeId, node},
  };
}
