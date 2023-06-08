import {createSelector} from 'reselect';
import sidebarSelector from './sidebarSelector';
import {BETA_FEATURES_ACCESS} from '../../../../authentication/constants/permissions';
import modelSelector from './modelSelector';
import {makeCurrentUserHasPermissionSelector, emailSelector as currentUserEmailSelector} from '../../../../authentication/selectors/currentUser';

export default createSelector(
  sidebarSelector, makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS), currentUserEmailSelector, modelSelector,
  (sidebar, hasBetaAccess, currentUserEmail, model) => {
    if (hasBetaAccess && model.get('email') === currentUserEmail) {
      return sidebar.get('toggleConfirmAdminUserAccessChangeModal');
    }
    return false;
  }
);
