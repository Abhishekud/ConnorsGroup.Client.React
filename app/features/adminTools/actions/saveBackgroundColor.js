import {http} from '../../shared/services';

export const SAVE_BACKGROUND_COLOR = 'SAVE_BACKGROUND_COLOR';
export const SAVE_BACKGROUND_COLOR_PENDING = `${SAVE_BACKGROUND_COLOR}_PENDING`;
export const SAVE_BACKGROUND_COLOR_FULFILLED = `${SAVE_BACKGROUND_COLOR}_FULFILLED`;
export const SAVE_BACKGROUND_COLOR_REJECTED = `${SAVE_BACKGROUND_COLOR}_REJECTED`;

export function saveBackgroundColor(model) {
  return {
    type: SAVE_BACKGROUND_COLOR,
    payload: http.post('admin/background', {color: model}),
  };
}
