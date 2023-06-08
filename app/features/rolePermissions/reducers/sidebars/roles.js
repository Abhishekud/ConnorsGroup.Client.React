import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  createRoleState,
  createRoleStates,
} from '../../services';
import {
  LOAD_ROLES_LIST_FULFILLED,
  TOGGLE_ROLES_SIDEBAR,
  CREATE_ROLE_FULFILLED,
  EDIT_ROLE,
  SET_ROLE_MODEL_PROPERTY,
  CANCEL_EDIT_ROLE,
  UPDATE_ROLE_PENDING,
  UPDATE_ROLE_FULFILLED,
  UPDATE_ROLE_REJECTED,
  DELETE_ROLE_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  roles: Map(),
  pristineRoles: Map(),
  roleStates: Map(),
  rolesValidationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ROLES_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_ROLES_LIST_FULFILLED: {
      const roles = action.payload.data;
      const rolesMap = modelsArrayToMapById(roles);

      return state.withMutations(map =>
        map.set('roles', rolesMap)
          .set('pristineRoles', rolesMap)
          .set('roleStates', createRoleStates(roles)));
    }

    case CREATE_ROLE_FULFILLED: {
      const role = action.payload.data;
      const roleMap = fromJS(role);

      return state.withMutations(map => {
        map.setIn(['roles', role.id], roleMap);
        map.setIn(['pristineRoles', role.id], roleMap);
        map.setIn(['roleStates', role.id], createRoleState());
      });
    }

    case EDIT_ROLE: {
      const id = action.payload;
      return state.withMutations(map =>
        map.setIn(['roleStates', id, 'editing'], true)
          .setIn(['pristineRoles', id], map.getIn(['roles', id])));
    }

    case SET_ROLE_MODEL_PROPERTY: {
      const {roleId: id, name, value} = action.payload;

      return state.setIn(['roles', id, name], value);
    }

    case CANCEL_EDIT_ROLE: {
      const id = action.payload;

      return state.withMutations(map =>
        map.setIn(['roleStates', id, 'editing'], false)
          .setIn(['roles', id], map.getIn(['pristineRoles', id]))
          .deleteIn(['rolesValidationErrors', id]));
    }

    case UPDATE_ROLE_PENDING: {
      const id = action.payload;

      return state.setIn(['roleStates', id, 'saving'], true);
    }

    case UPDATE_ROLE_FULFILLED: {
      const role = action.payload.data;
      const id = role.id;
      const roleMap = fromJS(role);

      return state.withMutations(map => {
        map.setIn(['roles', id], roleMap)
          .setIn(['pristineRoles', id], roleMap)
          .setIn(['roleStates', id, 'editing'], false)
          .setIn(['roleStates', id, 'saving'], false)
          .deleteIn(['rolesValidationErrors', id]);
      });
    }

    case UPDATE_ROLE_REJECTED: {
      const {payload} = action;
      const {status, data} = payload.response || {};
      const roleId = Number(/\d+$/.exec(payload.config.url)[0]);

      return state.withMutations(map => {
        map.setIn(['roleStates', roleId, 'saving'], false);

        if (status === 400) {
          map.setIn(['rolesValidationErrors', roleId], fromJS(data));
        } else {
          map.deleteIn(['rolesValidationErrors', roleId]);
        }
      });
    }

    case DELETE_ROLE_FULFILLED: {
      const id = action.payload.data;

      return state.withMutations(map => {
        map.deleteIn(['roles', id])
          .deleteIn(['pristineRoles', id])
          .deleteIn(['roleStates', id])
          .deleteIn(['rolesValidationErrors', id]);
      });
    }

    default:
      return state;
  }
}
