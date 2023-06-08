import {Map} from 'immutable';
import simplePageFormReducerFactory from '../../../forms/reducers/simplePageFormReducerFactory';
import {
  CHANGE_PASSWORD_FULFILLED,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_REJECTED,
  RESET_CHANGE_PASSWORD_FORM,
  SET_CHANGE_PASSWORD_FORM_FIELD,
} from '../../actions';

const initialModelState = new Map({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});

export default simplePageFormReducerFactory(
  initialModelState,
  RESET_CHANGE_PASSWORD_FORM, SET_CHANGE_PASSWORD_FORM_FIELD,
  CHANGE_PASSWORD_PENDING, CHANGE_PASSWORD_FULFILLED,
  CHANGE_PASSWORD_REJECTED
);
