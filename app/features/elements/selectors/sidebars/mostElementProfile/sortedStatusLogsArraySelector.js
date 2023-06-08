import {createSelector} from 'reselect';
import statusLogsSelector from './statusLogsSelector';

export default createSelector(
  statusLogsSelector,
  statusLogs => statusLogs.valueSeq().sortBy(log => log.get('id')).toArray()
);
