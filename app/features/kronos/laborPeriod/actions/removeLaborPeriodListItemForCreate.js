export const REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_CREATE = 'REMOVE_KRONOS_LABOR_PERIOD_LIST_ITEM_FOR_CREATE';

export function removeLaborPeriodListItemForCreate(index) {
  return {
    type: REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_CREATE,
    payload: {index},
  };
}
