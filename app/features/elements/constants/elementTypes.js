import {OrderedSet} from 'immutable';

export const ESTIMATE = 'Estimate';
export const TIMED = 'Timed';
export const MOST = 'MOST';
export const ALL = OrderedSet([ESTIMATE, TIMED, MOST]);
