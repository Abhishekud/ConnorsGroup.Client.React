import {modelsArrayToMapById} from '../../../shared/services';
import {Map, List} from 'immutable';
import {createPermissionsRolesMap} from '../../services';
import {DEFAULT_SORT as defaultSort} from '../../constants/sorts';
import {
  LOAD_ROLES_PAGE,
  LOAD_PERMISSION_ROLES_LIST_PENDING,
  LOAD_PERMISSION_ROLES_LIST_FULFILLED,
  LOAD_PERMISSION_ROLES_LIST_REJECTED,
  UPDATE_PERMISSIONS_ROLE_PENDING,
  UPDATE_PERMISSIONS_ROLE_FULFILLED,
  UPDATE_PERMISSIONS_ROLE_REJECTED,
  SORT_ROLES_LIST,
  FILTER_ROLES_LIST,
  CREATE_ROLE_FULFILLED,
  DELETE_ROLE_FULFILLED,
  UPDATE_ROLE_FULFILLED,
  TOGGLE_ROLE_GRID_CONFIGURATION_SIDEBAR,
  TOGGLE_ROLE_GRID_COLUMN_VISIBILITY_FULFILLED,
  REORDER_ROLES_GRID_COLUMN,
  LOAD_PERMISSION_OPTIONS_FULFILLED,
  CLEAR_ROLES_LIST_FILTERS,
  CLEAR_ROLES_LIST_SORTS,
} from '../../actions';

const initialState = Map({
  loading: false,
  saving: false,
  permissions: Map(),
  roles: Map(),
  permissionsRoles: Map(),
  sort: defaultSort,
  filter: null,
  showGridConfiguration: false,
  columnOrder: List(),
  hiddenColumns: Map(),
  permissionOptions: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ROLES_PAGE:
    case LOAD_PERMISSION_ROLES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_PERMISSION_ROLES_LIST_FULFILLED: {
      const {permissions, roles, permissionsRoles} = action.payload.data;

      return state.withMutations(map =>
        map.set('loading', false)
          .set('permissions', modelsArrayToMapById(permissions))
          .set('roles', modelsArrayToMapById(roles))
          .set('permissionsRoles', createPermissionsRolesMap(permissionsRoles)));
    }

    case LOAD_PERMISSION_ROLES_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ROLE_FULFILLED: {
      const {id, name, permissions} = action.payload.data;

      return state.withMutations(map =>
        map.setIn(['roles', id], Map({id, name}))
          .update('permissionsRoles', permissionsRoles =>
            permissionsRoles.withMutations(map => {
              permissions.forEach(permissionId => {
                map.updateIn([permissionId, 'roleIds'], roleIds => (roleIds.add(id)));
              });
            })
          ));
    }

    case UPDATE_ROLE_FULFILLED: {
      const {id, name} = action.payload.data;

      return state.setIn(['roles', id, 'name'], name);
    }

    case DELETE_ROLE_FULFILLED: {
      const {data} = action.payload;

      return state.withMutations(map => {
        map.deleteIn(['roles', data]);

        map.update('permissionsRoles', permissionsRoles =>
          permissionsRoles.map(permissionRoles =>
            permissionRoles.filterNot(id => id === data)));
      });
    }

    case UPDATE_PERMISSIONS_ROLE_PENDING:
      return state.set('saving', true);

    case UPDATE_PERMISSIONS_ROLE_REJECTED:
      return state.set('saving', false);

    case UPDATE_PERMISSIONS_ROLE_FULFILLED: {
      const {permissionId, remove, roleId} = action.payload.data;

      return state.withMutations(map =>
        map.set('saving', false)
          .update('permissionsRoles', permissionsRoles =>
            permissionsRoles.withMutations(map => {
              map.updateIn([permissionId, 'roleIds'], roleIds =>
                (remove ? roleIds.subtract([roleId]) : roleIds.add(roleId)));
            })
          )
      );
    }

    case SORT_ROLES_LIST:
      return state.set('sort', action.payload);

    case FILTER_ROLES_LIST:
      return state.set('filter', action.payload);

    case TOGGLE_ROLE_GRID_CONFIGURATION_SIDEBAR:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_ROLE_GRID_COLUMN_VISIBILITY_FULFILLED: {
      if (action.payload.visibility) {
        return state.deleteIn(['hiddenColumns', action.payload.field]);
      }
      //Remove filters on a column if it is hidden
      return state.withMutations(s => {
        if (s.get('filter') !== null) {
          const idx = s.getIn(['filter', 'filters']).findIndex(value => value.get('field') === action.payload.field);
          if (idx !== -1) {
            return s.deleteIn(['filter', 'filters', idx]).setIn(['hiddenColumns', action.payload.field], true);
          }
        }

        //Remove sorts on a column if it is hidden
        if (!action.payload.visibility && s.get('sort') !== null) {
          const idx = s.get('sort').findIndex(value => value.get('field') === action.payload.field);
          if (idx !== -1) {
            s.deleteIn(['sort', idx]);
          }
        }

        return s.setIn(['hiddenColumns', action.payload.field], true);
      });
    }

    case REORDER_ROLES_GRID_COLUMN: {
      const {columnKey, newIndex, oldIndex} = action.payload;
      return state.update('columnOrder', order => order.push(Map({column: columnKey, newIndex, oldIndex})));
    }

    case LOAD_PERMISSION_OPTIONS_FULFILLED:
      return state.withMutations(map => map.set('permissionOptions', action.payload.data));

    case CLEAR_ROLES_LIST_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_ROLES_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
