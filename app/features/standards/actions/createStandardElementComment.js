import {http} from '../../shared/services';

export const CREATE_STANDARD_ELEMENT_COMMENT = 'CREATE_STANDARD_ELEMENT_COMMENT';
export const CREATE_STANDARD_ELEMENT_COMMENT_REJECTED = `${CREATE_STANDARD_ELEMENT_COMMENT}_REJECTED`;
export const CREATE_STANDARD_ELEMENT_COMMENT_PENDING = `${CREATE_STANDARD_ELEMENT_COMMENT}_PENDING`;
export const CREATE_STANDARD_ELEMENT_COMMENT_FULFILLED = `${CREATE_STANDARD_ELEMENT_COMMENT}_FULFILLED`;

export function createStandardElementComment(standardId, standardElementId, comment) {
  return {
    type: CREATE_STANDARD_ELEMENT_COMMENT,
    payload: http.post(`standards/${standardId}/elements/${standardElementId}/create/comment`, {
      comment,
    }),
  };
}
