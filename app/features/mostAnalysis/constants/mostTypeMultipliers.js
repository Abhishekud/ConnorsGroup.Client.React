import {Map} from 'immutable';
import {
  MINI_MOST,
  BASIC_MOST,
} from './mostTypes';

const MOST_TYPE_MULTIPLIERS = Map({
  [MINI_MOST]: 1,
  [BASIC_MOST]: 10,
});

export default MOST_TYPE_MULTIPLIERS;
