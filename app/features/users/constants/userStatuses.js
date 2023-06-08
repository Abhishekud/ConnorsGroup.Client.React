import {OrderedSet} from 'immutable';

export const ENABLED = 'Enabled';
export const DISABLED = 'Disabled';
export const LOG_IN_LOCKED = 'LogInLocked';
export const ALL = new OrderedSet([ENABLED, DISABLED]);
export const DISPLAYABLE = new OrderedSet([LOG_IN_LOCKED, ENABLED, DISABLED]);
