import {http} from '../../shared/services';

export const UPDATE_LOCATIONS_ATTRIBUTE = 'UPDATE_LOCATIONS_ATTRIBUTE';
export const UPDATE_LOCATIONS_ATTRIBUTE_PENDING = `${UPDATE_LOCATIONS_ATTRIBUTE}_PENDING`;
export const UPDATE_LOCATIONS_ATTRIBUTE_FULFILLED = `${UPDATE_LOCATIONS_ATTRIBUTE}_FULFILLED`;
export const UPDATE_LOCATIONS_ATTRIBUTE_REJECTED = `${UPDATE_LOCATIONS_ATTRIBUTE}_REJECTED`;

export function updateLocationsAttribute(locations, attributeId) {
  return {
    type: UPDATE_LOCATIONS_ATTRIBUTE,
    payload: http.put('attributes/update-locations-attribute', {locations, attributeId}),
  };
}
