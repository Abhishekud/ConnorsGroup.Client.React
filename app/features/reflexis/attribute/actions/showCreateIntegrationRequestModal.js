export const SHOW_CREATE_INTEGRATION_REQUEST_MODAL = 'REFLEXIS/SHOW_CREATE_INTEGRATION_REQUEST_MODAL';

function showCreateIntegrationRequestModal(model) {
  return {
    type: SHOW_CREATE_INTEGRATION_REQUEST_MODAL,
    payload: model,
  };
}

export function showCreateAttributeIntegrationRequestModal(selectedAttributeIds, allAttributesSelected, attributeFilter) {
  const model = {
    selectedAttributeIds,
    allAttributesSelected,
    attributeFilter,
    selectedLocationIds: [],
    allLocationsSelected: false,
    locationFilter: null,
  };

  return showCreateIntegrationRequestModal(model);
}

export function showCreateLocationIntegrationRequestModal(selectedLocationIds, allLocationsSelected, locationFilter) {
  const model = {
    selectedAttributeIds: [],
    allAttributesSelected: false,
    attributesFilter: null,
    selectedLocationIds,
    allLocationsSelected,
    locationFilter,
  };

  return showCreateIntegrationRequestModal(model);
}
