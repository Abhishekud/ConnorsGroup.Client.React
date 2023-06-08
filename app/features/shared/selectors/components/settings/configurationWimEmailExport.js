import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {WIM_EMAIL_EXPORT} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(WIM_EMAIL_EXPORT)
);

