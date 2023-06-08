import {combineReducers} from 'redux';
import tumbleweedEndpoint from './tumbleweedEndpoint';
import tumbleweedSchedules from './tumbleweedSchedules';
import tumbleweedLogs from './tumbleweedLogs';

export default combineReducers({
  tumbleweedEndpoint,
  tumbleweedSchedules,
  tumbleweedLogs,
});
