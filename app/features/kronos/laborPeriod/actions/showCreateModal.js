export const SHOW_CREATE_MODAL = 'SHOW_CREATE_KRONOS_LABOR_PERIOD_MODAL';

export function showCreateModal(nextId) {
  return {
    type: SHOW_CREATE_MODAL,
    payload: nextId,
  };
}

