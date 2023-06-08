import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageTitle,
} from '../../layout/components';
import {ADMIN_ACCEPT_TERMS} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {returnPathSelector} from '../selectors/pages/verifyUser';
import {acceptingSelector} from '../selectors/pages/terms';
import {
  isAuthenticatedSelector,
  acceptedTermsSelector,
} from '../selectors/currentUser';
import {loadSelectListsOptions} from '../../selectListOptions/actions';
import {
  loadAttributeSelectListOptions,
} from '../../attributes/actions';
import {loadVolumeDriverSelectListOptions} from '../../volumeDrivers/actions';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {selectListTypes} from '../../selectListOptions/constants';
import {acceptTerms, setReturnPath} from '../actions';
import {loadSettings, loadConfiguration} from '../../shared/actions';
import {handleApiError} from '../../shared/services';
import {Terms} from './';

class TermsAndConditionsPage extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {isAuthenticated, acceptedTerms, router} = this.props;

    if (!isAuthenticated) {
      router.push('/verify-user');
    } else if (acceptedTerms) {
      router.push('/');
    }
  }

  handleAcceptTerms() {
    const {
      acceptTerms,
      setReturnPath,
      loadSelectListsOptions,
      loadAttributeSelectListOptions,
      loadVolumeDriverSelectListOptions,
      loadSettings,
      loadConfiguration,
      returnPath,
      router,
      loadOrgHierarchyLevelsList,
    } = this.props;

    acceptTerms()
      .then(() => {
        setReturnPath('');
        loadSelectListsOptions(...selectListTypes.ALL);
        loadAttributeSelectListOptions();
        loadVolumeDriverSelectListOptions();
        loadOrgHierarchyLevelsList();
        loadSettings();
        loadConfiguration();
        router.push(returnPath || '/');
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to accept the Terms & Conditions.'));
  }

  handleRejectTerms() {
    const {router} = this.props;

    router.push('/log-out');
  }

  render() {
    const {accepting, canAcceptTerms} = this.props;

    return (
      <Page pageClassName="terms-page">
        <PageHeader>
          <PageTitle>SOFTWARE AND SERVICES AGREEMENT</PageTitle>
        </PageHeader>
        <PageBody>
          <MainContent>
            <div className="terms">
              <Terms />
              <div className="actions">
                <Button bsStyle="primary" disabled={!canAcceptTerms || accepting} onClick={this.handleAcceptTerms}>Accept</Button>
                <Button disabled={accepting} onClick={this.handleRejectTerms}>Reject</Button>
              </div>
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canAcceptTermsSelector = makeCurrentUserHasPermissionSelector(ADMIN_ACCEPT_TERMS);
  return {
    returnPath: returnPathSelector(state),
    isAuthenticated: isAuthenticatedSelector(state),
    acceptedTerms: acceptedTermsSelector(state),
    accepting: acceptingSelector(state),
    canAcceptTerms: canAcceptTermsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    acceptTerms,
    setReturnPath,
    loadSelectListsOptions,
    loadAttributeSelectListOptions,
    loadVolumeDriverSelectListOptions,
    loadSettings,
    loadConfiguration,
    loadOrgHierarchyLevelsList,
  },
)(TermsAndConditionsPage));
