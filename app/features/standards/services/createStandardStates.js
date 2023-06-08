import {Map} from 'immutable';
import createStandardState from './createStandardState';

export default function (standards) {
  return Map(standards.map(s => [s.get('id'), createStandardState(s)]));
}
