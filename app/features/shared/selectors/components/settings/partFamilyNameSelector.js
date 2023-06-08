import {createSelector} from 'reselect';
import componentSelector from './componentSelector';
import {settingIds} from '../../../constants';

export default createSelector(
  componentSelector,
  component => component.getIn(['settings', settingIds.PartFamilyNameId, 'value']) || 'Part Family',
);
