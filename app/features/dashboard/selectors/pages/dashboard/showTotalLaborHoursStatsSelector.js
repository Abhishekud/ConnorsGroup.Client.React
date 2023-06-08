import {createSelector} from 'reselect';
import componentSelector from '../../../../shared/selectors/components/settings/componentSelector';
import {settingIds} from '../../../../shared/constants';

export default createSelector(
  componentSelector,
  component =>
    (component.getIn(['settings', settingIds.EnableLaborHours, 'value']) === 'true')
);
