export const REGISTER_MOST_STEP_SCROLL_NODE = 'REGISTER_MOST_STEP_SCROLL_NODE';

export function registerMOSTStepScrollNode(nodeId, node) {
  return {
    type: REGISTER_MOST_STEP_SCROLL_NODE,
    payload: {nodeId, node},
  };
}
