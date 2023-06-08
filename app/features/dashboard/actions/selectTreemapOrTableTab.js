export const SELECT_TREEMAP_OR_TABLE_TAB = 'SELECT_TREEMAP_OR_TABLE_TAB';

export function selectTreemapOrTableTab(tab) {
  return {
    type: SELECT_TREEMAP_OR_TABLE_TAB,
    payload: tab,
  };
}
