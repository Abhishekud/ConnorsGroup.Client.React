import {http} from '../../shared/services';

export const CREATE_VOLUME_DRIVER_VALUE_SET = 'CREATE_VOLUME_DRIVER_VALUE_SET';
export const CREATE_VOLUME_DRIVER_VALUE_SET_PENDING = `${CREATE_VOLUME_DRIVER_VALUE_SET}_PENDING`;
export const CREATE_VOLUME_DRIVER_VALUE_SET_FULFILLED = `${CREATE_VOLUME_DRIVER_VALUE_SET}_FULFILLED`;
export const CREATE_VOLUME_DRIVER_VALUE_SET_REJECTED = `${CREATE_VOLUME_DRIVER_VALUE_SET}_REJECTED`;

export function createVolumeDriverValueSet(model, fileObject) {
  const {name, description, isDefault} = model.toJS();
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('isDefault', isDefault);
  data.append('file', fileObject);
  return {
    type: CREATE_VOLUME_DRIVER_VALUE_SET,
    payload: http.post('volume-driver-value-sets', data),
  };
}
