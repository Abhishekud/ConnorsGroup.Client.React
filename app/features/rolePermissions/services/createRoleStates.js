import {Map} from 'immutable';
import createRoleState from './createRoleState';

export default function (roles) {
  return Map(roles.map(a => [a.id, createRoleState()]));
}
