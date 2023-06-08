import {Map} from 'immutable';
import createAttributeState from './createAttributeState';

export default function (attributes) {
  return Map(attributes.map(a => [a.id, createAttributeState()]));
}
