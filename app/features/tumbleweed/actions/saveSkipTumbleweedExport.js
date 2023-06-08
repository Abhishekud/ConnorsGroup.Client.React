import {http} from '../../shared/services';

export const SAVE_SKIP_TUMBLEWEED_EXPORT = 'SAVE_SKIP_TUMBLEWEED_EXPORT';
export const SAVE_SKIP_TUMBLEWEED_EXPORT_PENDING = `${SAVE_SKIP_TUMBLEWEED_EXPORT}_PENDING`;
export const SAVE_SKIP_TUMBLEWEED_EXPORT_FULFILLED = `${SAVE_SKIP_TUMBLEWEED_EXPORT}_FULFILLED`;
export const SAVE_SKIP_TUMBLEWEED_EXPORT_REJECTED = `${SAVE_SKIP_TUMBLEWEED_EXPORT}_REJECTED`;

export function saveSkipTumbleweedExport(model) {
  return {
    type: SAVE_SKIP_TUMBLEWEED_EXPORT,
    payload: http.put('tumbleweed/skip', model),
  };
}
