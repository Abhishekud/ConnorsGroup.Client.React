import {Map} from 'immutable';
import createElementState from './createElementState';

export default function (elements) {
  return Map(elements.map(e => [e.id, createElementState(e)]));
}
