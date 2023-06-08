import {createSelector} from 'reselect';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';
import {kronosIntegrationVersionSelector} from '../../integrationEndpoint/selectors/modals/createEndpoint';

export default createSelector(
  kronosIntegrationVersionSelector,
  kronosVersion => kronosVersion !== null && kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.DISABLED
);
