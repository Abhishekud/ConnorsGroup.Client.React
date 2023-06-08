import {Map} from 'immutable';
import simplePageFormReducerFactory from '../../../forms/reducers/simplePageFormReducerFactory';
import {
  RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_REJECTED,
  RESET_RESET_PASSWORD_FORM,
  SET_RESET_PASSWORD_FORM_FIELD,
} from '../../actions';

const initialModelState = new Map({
  passwordResetToken: '',
  password: '',
  confirmPassword: '',
});

const simplePageFormReducer = simplePageFormReducerFactory(
  initialModelState,
  RESET_RESET_PASSWORD_FORM, SET_RESET_PASSWORD_FORM_FIELD,
  RESET_PASSWORD_PENDING, RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_REJECTED
);

export default function (state, action) {
  switch (action.type) {
    case RESET_RESET_PASSWORD_FORM: {
      const newState = simplePageFormReducer(state, action);
      return newState.setIn(['model', 'passwordResetToken'], action.payload.passwordResetToken);
    }

    default: {
      return simplePageFormReducer(state, action);
    }
  }
}
