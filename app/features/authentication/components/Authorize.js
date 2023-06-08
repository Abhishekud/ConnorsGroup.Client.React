import {connect} from 'react-redux';
import intersection from 'lodash/intersection';
import {setReturnPath, logOut} from '../actions';
import {withRouter} from 'react-router';
import {Component} from 'react';
import {PropTypes} from 'prop-types';
import {isAuthenticatedSelector, acceptedTermsSelector, makeCurrentUserHasPermissionSelector, userPermissionsSelector} from '../selectors/currentUser';
import {ADMIN_ACCEPT_TERMS} from '../constants/permissions';
import {configurationKronosIntegrationSelector, enablePartsSelector} from '../../shared/selectors/components/settings';

class Authorize extends Component {
  componentDidMount() {
    const {
      isAuthenticated, acceptedTerms, currentPath, dispatch, hasKronos,
      hasAdminAcceptTerms, route, router, permissions, hasParts,
    } = this.props;

    if (!isAuthenticated) {
      dispatch(setReturnPath(currentPath));
      router.push('/verify-user');
    } else if (!acceptedTerms && hasAdminAcceptTerms) {
      dispatch(setReturnPath(currentPath));
      router.push('/terms');
    } else if (!acceptedTerms) {
      dispatch(logOut());
      router.push('/not-authorized');
    } else if (route.permissions && !intersection(route.permissions, permissions.toArray()).length) {
      router.push('/not-authorized');
    } else if ((route.checkParts && !hasParts) || (route.checkKronos && !hasKronos)) {
      router.push('/');
    }
  }

  render() {
    const {isAuthenticated, acceptedTerms, children, permissions, route} = this.props;
    const shouldRenderChildren =
      isAuthenticated && acceptedTerms &&
      (!route.permissions || intersection(route.permissions, permissions.toArray()).length);

    return shouldRenderChildren ? children : null;
  }
}

Authorize.propTypes = {
  children: PropTypes.element.isRequired,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  checkParts: PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  const hasAdminAcceptTermsSelector = makeCurrentUserHasPermissionSelector(ADMIN_ACCEPT_TERMS);

  return {
    currentPath: ownProps.location.pathname,
    isAuthenticated: isAuthenticatedSelector(state),
    acceptedTerms: acceptedTermsSelector(state),
    hasAdminAcceptTerms: hasAdminAcceptTermsSelector(state),
    permissions: userPermissionsSelector(state),
    hasParts: enablePartsSelector(state),
    hasKronos: configurationKronosIntegrationSelector(state),
  };
}

export default withRouter(connect(mapStateToProps)(Authorize));
