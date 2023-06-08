import {Map} from 'immutable';
import createStandardItemState from './createStandardItemState';

export default function (standardItems) {
  return Map(standardItems.map(si => [si.id, createStandardItemState(si)]));
}
