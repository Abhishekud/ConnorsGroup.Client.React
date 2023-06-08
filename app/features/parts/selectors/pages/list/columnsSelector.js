import {createSelector} from 'reselect';
import columnConfigurationSelector from './columnConfigurationSelector';

export default createSelector(
  columnConfigurationSelector,
  columns => columns.filter(c => c.get('included'))
);
