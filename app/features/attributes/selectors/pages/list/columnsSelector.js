import {createSelector} from 'reselect';
import columnsConfigurationSelector from './columnsConfigurationSelector';

export default createSelector(
  columnsConfigurationSelector,
  columns => columns.filter(c => c.get('included'))
);
