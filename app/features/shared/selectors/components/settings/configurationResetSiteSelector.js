import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {ADMIN_RESET_SITE} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(ADMIN_RESET_SITE)
);
