import {http} from '../../shared/services';
import {once} from 'lodash';

export const LOAD_CONFIGURATION = 'LOAD_CONFIGURATION';
export const LOAD_CONFIGURATION_PENDING = `${LOAD_CONFIGURATION}_PENDING`;
export const LOAD_CONFIGURATION_REJECTED = `${LOAD_CONFIGURATION}_REJECTED`;
export const LOAD_CONFIGURATION_FULFILLED = `${LOAD_CONFIGURATION}_FULFILLED`;

const action = once(() => ({
  type: LOAD_CONFIGURATION,
  payload: http.get('configuration/list'),
}));


export function loadConfiguration() {
  return action();
}
