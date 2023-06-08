export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL_KRONOS_TASK_GROUP';

export function showDeleteModal(model) {
  return {
    type: SHOW_DELETE_MODAL,
    payload: model,
  };
}


