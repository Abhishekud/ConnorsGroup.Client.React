import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import permissionsSelector from './permissionsSelector';
import permissionsRolesSelector from './permissionsRolesSelector';
import rolesSelector from './rolesSelector';

const expandedPermissionsSelector = createSelector(
  permissionsSelector,
  permissions => permissions
);

const aggregatedDataSelector = createSelector(
  expandedPermissionsSelector,
  permissionsRolesSelector,
  rolesSelector,
  (permissions, permissionRoles, roles) =>
    permissions.map(permission => {
      const value = permissionRoles.getIn([permission.get('id'), 'roleIds']);
      return roles
        .reduce((l, role) => l.set(`role_${role.get('id')}`, value && value.contains(role.get('id'))), permission)
        .merge(permission)
        .set('inEdit', true);
    }).toList()
);

export default createSelector(
  aggregatedDataSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => fromJS(orderBy(filterBy(data.toJS(), (filter === null ? null : filter.toJS())), sort.toJS()))
);
