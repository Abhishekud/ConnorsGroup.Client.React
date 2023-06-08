import {http} from '../../shared/services';

export const UPLOAD_CLIENT_PHOTO = 'UPLOAD_CLIENT_PHOTO';
export const UPLOAD_CLIENT_PHOTO_PENDING = `${UPLOAD_CLIENT_PHOTO}_PENDING`;
export const UPLOAD_CLIENT_PHOTO_FULFILLED = `${UPLOAD_CLIENT_PHOTO}_FULFILLED`;
export const UPLOAD_CLIENT_PHOTO_REJECTED = `${UPLOAD_CLIENT_PHOTO}_REJECTED`;

export function uploadClientPhoto(file) {
  const data = new FormData();
  data.append('file', file);
  return {
    type: UPLOAD_CLIENT_PHOTO,
    payload: http.post('admin/upload', data),
  };
}
