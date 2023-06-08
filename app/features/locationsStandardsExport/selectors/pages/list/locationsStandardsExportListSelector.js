import {createSelector} from 'reselect';
import locationsStandardsExportDataSelector from './locationsStandardsExportDataSelector';
import skipSelector from './skipSelector';
import takeSelector from './takeSelector';

export default createSelector(
  locationsStandardsExportDataSelector,
  skipSelector,
  takeSelector,
  (data, skip, take) => data.skip(skip).take(take)
);
