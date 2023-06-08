import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {handleApiError, toastr} from '../../shared/services';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../kronos/constants/KronosVersions';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  loadingSelector,
  savingSelector,
  tumbleweedEndpointSelector,
  validationErrorsSelector,
  isPristineSelector,
} from '../selectors/pages/endpoint';
import TumbleweedEndpointForm from './TumbleweedEndpointForm';
import {navigationGroups} from '../../shared/constants';
import {
  loadTumbleweedIntegration,
  saveTumbleweedIntegration,
  setTumbleweedFieldValue,
} from '../actions';
import {withRouter} from 'react-router';
import {configurationKronosVersion} from '../../shared/selectors/components/settings';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {TUMBLEWEED_INTEGRATION_EDIT} from '../../authentication/constants/permissions';

class TumbleweedEndpointPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadTumbleweedIntegration, kronosVersion} = this.props;
    if (kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED) {
      window.location.href = '/';
    }
    loadTumbleweedIntegration()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the integration.'));
  }

  handleFieldChange(name) {
    return event => {
      const {value} = event.target;
      this.props.setTumbleweedFieldValue(name, value);
    };
  }

  handleCheckboxChange(name) {
    return event => {
      const {checked} = event.target;
      this.props.setTumbleweedFieldValue(name, checked);
    };
  }

  handleSave(event) {
    event.preventDefault();

    const {tumbleweedEndpoint, saveTumbleweedIntegration, router, loadTumbleweedIntegration} = this.props;

    saveTumbleweedIntegration(tumbleweedEndpoint)
      .then(() => {
        loadTumbleweedIntegration();
        toastr.success('Settings updated.');
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting update the integration.'));
  }

  handleCancel() {
    const {loadTumbleweedIntegration, router} = this.props;
    loadTumbleweedIntegration()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the integration.'));
  }

  render() {
    const {
      isPristine,
      loading,
      saving,
      tumbleweedEndpoint,
      validationErrors,
      canEdit,
    } = this.props;

    return (
      <Page pageClassName="tumbleweed-endpoint-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Integration Endpoint</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.TUMBLEWEED_MODULE} />
          <MainContent loading={loading}>
            <div className="settings-row">
              <TumbleweedEndpointForm
                disabled={saving || !canEdit}
                tumbleweedEndpoint={tumbleweedEndpoint}
                isPristine={isPristine}
                onSave={this.handleSave}
                onCancel={this.handleCancel}
                onFieldChange={this.handleFieldChange}
                onCheckboxChange={this.handleCheckboxChange}
                formValidationErrors={validationErrors} />
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

TumbleweedEndpointPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  tumbleweedEndpoint: PropTypes.instanceOf(Map),
  validationErrors: PropTypes.instanceOf(Map),
  loadTumbleweedIntegration: PropTypes.func.isRequired,
  saveTumbleweedIntegration: PropTypes.func.isRequired,
  setTumbleweedFieldValue: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_INTEGRATION_EDIT);
  return {
    loading: loadingSelector(state),
    saving: savingSelector(state),
    tumbleweedEndpoint: tumbleweedEndpointSelector(state),
    validationErrors: validationErrorsSelector(state),
    isPristine: isPristineSelector(state),
    kronosVersion: configurationKronosVersion(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadTumbleweedIntegration,
    saveTumbleweedIntegration,
    setTumbleweedFieldValue,
  }
)(TumbleweedEndpointPage));
