import {Map} from 'immutable';
import simplePageFormReducerFactory from '../../../forms/reducers/simplePageFormReducerFactory';
import {
  REQUEST_PASSWORD_RESET_FULFILLED,
  REQUEST_PASSWORD_RESET_PENDING,
  REQUEST_PASSWORD_RESET_REJECTED,
  RESET_REQUEST_PASSWORD_RESET_FORM,
  SET_REQUEST_PASSWORD_RESET_FORM_FIELD,
} from '../../actions';

const initialModelState = new Map({
  email: '',
});

export default simplePageFormReducerFactory(
  initialModelState,
  RESET_REQUEST_PASSWORD_RESET_FORM, SET_REQUEST_PASSWORD_RESET_FORM_FIELD,
  REQUEST_PASSWORD_RESET_PENDING, REQUEST_PASSWORD_RESET_FULFILLED,
  REQUEST_PASSWORD_RESET_REJECTED
);
