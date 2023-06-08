import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import reactCSS from 'reactcss';
import {connect} from 'react-redux';
import LogInForm from './LogInForm';
import {loadSelectListsOptions} from '../../selectListOptions/actions';
import {
  loadAttributeSelectListOptions,
} from '../../attributes/actions';
import {loadVolumeDriverSelectListOptions} from '../../volumeDrivers/actions';
import {loadUnitOfMeasureSelectListOptions} from '../../unitsOfMeasure/actions';
import {selectListTypes} from '../../selectListOptions/constants';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {withRouter} from 'react-router';
import {
  modelSelector,
  submittingSelector,
  validationErrorsSelector,
  authenticationMethodSelector,
  ssoIdentityProvidersSelector,
  loadingSelector,
} from '../selectors/pages/logIn';
import {
  colorSelector,
} from '../../shared/selectors/components/clientBrand';
import {
  clientNameSelector,
  settingsVersionSelector,
} from '../../shared/selectors/components/settings';
import {loadCharacteristicSetSelectListOptions} from '../../characteristics/actions';
import {loadVolumeDriverMappingSetSelectListOptions} from '../../volumeDriverMappings/actions';
import {loadSettings, loadConfiguration, changeTimeFormat} from '../../shared/actions';
import {returnPathSelector} from '../selectors/pages/verifyUser';
import {loadAuthenticationMethod, logIn, resetLoginForm, setLoginFormField, setReturnPath} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import logo from '../../layout/images/logo-circle-white.png';
import LoadingOverlay from 'react-loading-overlay';
import {authenticationMethods} from '../constants';
import setTimeFormat from '../../shared/services/setTimeFormat';

class LogInPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadAuthenticationMethod, resetLoginForm} = this.props;

    resetLoginForm();
    loadAuthenticationMethod();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.handleFieldChange(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      handleSubmit,
      model,
      returnPath,
      router,
      setReturnPath,
      loadSelectListsOptions,
      loadAttributeSelectListOptions,
      loadVolumeDriverSelectListOptions,
      loadCharacteristicSetSelectListOptions,
      loadVolumeDriverMappingSetSelectListOptions,
      loadUnitOfMeasureSelectListOptions,
      loadSettings,
      loadConfiguration,
      changeTimeFormat,
    } = this.props;

    handleSubmit(model)
      .then(() => {
        setReturnPath('');
        loadSettings().then(result => {
          setTimeFormat(result.value.data, changeTimeFormat);
        });
        loadSelectListsOptions(...selectListTypes.ALL);
        loadAttributeSelectListOptions();
        loadVolumeDriverSelectListOptions();
        loadOrgHierarchyLevelsList();
        loadCharacteristicSetSelectListOptions();
        loadVolumeDriverMappingSetSelectListOptions();
        loadUnitOfMeasureSelectListOptions();
        loadConfiguration().then(() => router.push(returnPath || '/'));
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to login.', 'Error'));
  }

  render() {
    const {
      authenticationMethod,
      ssoIdentityProviders,
      returnPath,
      loading,
      model,
      submitting,
      validationErrors,
      color,
      clientName,
      settingsVersion,
    } = this.props;

    const styles = reactCSS({
      'default': {
        client: {
          background: color,
        },
      },
    });

    if (loading) {
      return <LoadingOverlay active text="Loading..." className="loading-overlay" />;
    }

    const ssoRedirectUri = `${process.env.APP_BASE_URL}${returnPath.startsWith('/') ? returnPath.substring(1) : returnPath}`;

    const src = `${process.env.API_BASE_URL}logo?version=${settingsVersion}`;

    return (
      <div className="log-in-page">
        <div className="left-log-in">
          <div className="header">
            <h3>LaborPro</h3>
          </div>
          <div className="client-info">
            <img src={src} />
            <div>{clientName}</div>
            <div className="login-text">LOGIN</div>
          </div>

          {authenticationMethod === authenticationMethods.SSO &&
          <div className="sso-identity-providers">
            {ssoIdentityProviders.map(x => (
              <div className="sso-identity-provider" key={x.idpId}>
                <Button bsStyle="primary"
                  href={`${process.env.API_BASE_URL}authentication/okta-log-in` +
                        `?redirectUri=${encodeURIComponent(ssoRedirectUri)}` +
                        `&idpId=${encodeURIComponent(x.idpId)}`}>
                  {x.name} Login
                </Button>
              </div>
            ))}
            <div className="sso-identity-provider">
              <Button bsStyle="primary"
                href={`${process.env.API_BASE_URL}authentication/okta-log-in` +
                      `?redirectUri=${encodeURIComponent(ssoRedirectUri)}`}>
                Connors Group Login
              </Button>
            </div>
          </div>}

          {authenticationMethod === authenticationMethods.PASSWORD &&
          <LogInForm
            model={model}
            submitting={submitting}
            validationErrors={validationErrors}
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleSubmit} />}

          {authenticationMethod === authenticationMethods.CONNORS_GROUP_SSO &&
          <>
            <LogInForm
              model={model}
              submitting={submitting}
              validationErrors={validationErrors}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSubmit} />
            <div className="sso-identity-providers">
              <div className="sso-identity-provider">
                <Button bsStyle="primary"
                  href={`${process.env.API_BASE_URL}authentication/okta-log-in` +
                        `?redirectUri=${encodeURIComponent(ssoRedirectUri)}`}>
                  Connors Group Login
                </Button>
              </div>
            </div>
          </>}

        </div>
        <div style={styles.client} className="right-log-in">
          <img src={logo} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    authenticationMethod: authenticationMethodSelector(state),
    ssoIdentityProviders: ssoIdentityProvidersSelector(state),
    model: modelSelector(state),
    returnPath: returnPathSelector(state),
    submitting: submittingSelector(state),
    validationErrors: validationErrorsSelector(state),
    color: colorSelector(state),
    clientName: clientNameSelector(state),
    settingsVersion: settingsVersionSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadAuthenticationMethod,
    resetLoginForm,
    setReturnPath,
    loadSelectListsOptions,
    loadAttributeSelectListOptions,
    loadVolumeDriverSelectListOptions,
    loadUnitOfMeasureSelectListOptions,
    loadCharacteristicSetSelectListOptions,
    loadVolumeDriverMappingSetSelectListOptions,
    loadSettings,
    loadConfiguration,
    handleFieldChange: setLoginFormField,
    handleSubmit: logIn,
    changeTimeFormat,
  }
)(LogInPage));
