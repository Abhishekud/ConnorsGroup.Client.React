import {fromJS, Map} from 'immutable';
import {
  LOAD_USERS_LIST_FULFILLED,
  SELECT_USER,
  CLEAR_SELECTED_USER,
  CLOSE_USERS_LIST_EDIT_SIDEBAR,
  SET_EDIT_USER_MODEL_PROPERTY,
  UPDATE_USER_PENDING,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_REJECTED,
  CANCEL_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL,
  TOGGLE_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL,
} from '../../actions';
import {userStatuses} from '../../constants';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  toggleConfirmAdminUserAccessChangeModal: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_USER:
    case CLOSE_USERS_LIST_EDIT_SIDEBAR:
    case LOAD_USERS_LIST_FULFILLED:
    case UPDATE_USER_FULFILLED:
      return initialState;

    case SELECT_USER:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_USER_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_USER_PENDING:
      return state.set('saving', true);

    case UPDATE_USER_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case TOGGLE_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL:
      return state.update('toggleConfirmAdminUserAccessChangeModal', show => !show);

    case CANCEL_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL:{
      if (state.getIn(['model', 'status']) === userStatuses.DISABLED && !state.getIn(['model', 'roleIds']).includes(action.payload)) {
        return state.withMutations(map => (
          map.set('toggleConfirmAdminUserAccessChangeModal', false)
            .updateIn(['model', 'roleIds'], roleIds => roleIds.push(action.payload))
        ));
      }
      return state.withMutations(map => (
        map.set('toggleConfirmAdminUserAccessChangeModal', false)
          .updateIn(['model', 'roleIds'], roleIds => roleIds.push(action.payload))
          .setIn(['model', 'status'], userStatuses.ENABLED)
      ));
    }

    default:
      return state;
  }
}
