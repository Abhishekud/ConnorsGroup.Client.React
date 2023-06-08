import {fromJS, Map, Set} from 'immutable';

export default function (permissionsRolesArray) {
  const permissionsRolesMap = new Map().asMutable();

  for (const permissionRoles of permissionsRolesArray) {
    permissionsRolesMap.set(permissionRoles.id, fromJS(permissionRoles));
    permissionsRolesMap.setIn([permissionRoles.id, 'roleIds'], Set(permissionRoles.roleIds));
  }

  return permissionsRolesMap.asImmutable();
}
