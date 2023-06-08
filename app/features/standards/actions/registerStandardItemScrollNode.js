export const REGISTER_STANDARD_ITEM_SCROLL_NODE = 'REGISTER_STANDARD_ITEM_SCROLL_NODE';

export function registerStandardItemScrollNode(nodeId, node) {
  return {
    type: REGISTER_STANDARD_ITEM_SCROLL_NODE,
    payload: {nodeId, node},
  };
}
