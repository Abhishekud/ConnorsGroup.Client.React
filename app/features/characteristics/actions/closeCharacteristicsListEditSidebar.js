export const CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR = 'CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR';

export function closeCharacteristicsListEditSidebar(selectedBulkEditCharacteristicSetId) {
  return {
    type: CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR,
    payload: {selectedBulkEditCharacteristicSetId,
    },
  };
}
