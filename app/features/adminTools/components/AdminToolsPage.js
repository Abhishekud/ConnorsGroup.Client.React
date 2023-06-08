import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {handleApiError, setTimeFormat, toastr} from '../../shared/services';
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
  fieldsSelector,
  validationErrorsSelector,
  isPrestineSelector,
  colorSelector,
  pristineColorSelector,
  laborCalculationDisabledSelector,
  confirmResetModalVisibleSelector,
  modalSavingSelector,
} from '../selectors/pages/adminTools';
import {ADMIN_USERS, TRAINING_PARTICIPANT} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {
  configurationResetSiteSelector,
  settingsVersionSelector,
} from '../../shared/selectors/components/settings';
import {
  AdminToolsColorPicker,
  AdminToolsPhotoDropzone,
  AdminToolsFields,
  AdminToolsActions,
} from './';
import {navigationGroups} from '../../shared/constants';
import {
  selectBackgroundColor,
  saveBackgroundColor,
  cancelChangeBackgroundColor,
  uploadClientPhoto,
  setFieldValue,
  saveSettings,
  triggerLaborCalculation,
  resetSite,
  showConfirmResetModal,
  hideConfirmResetModal,
} from '../actions';
import {changeTimeFormat, loadBrand, loadSettings, pollBackgroundJobs} from '../../shared/actions';
import {withRouter} from 'react-router';
import {
  POLL_INTERVAL,
  LOCATIONS_STANDARDS,
  CALCULATE_LABOR,
} from '../../shared/constants/backgroundJobs';

class AdminToolsPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadBrand, loadSettings} = this.props;
    loadBrand()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the client brand information.'));
    loadSettings()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the system settings.'));

    this.checkBackgroundJobs();
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  handleFileSelected(file) {
    const {router, uploadClientPhoto} = this.props;
    uploadClientPhoto(file[0])
      .catch(error => handleApiError(error, router, 'The selected file was corrupted or not an image file.'));
  }

  handleFieldChange(id) {
    return event => {
      const {value} = event.target;
      this.props.setFieldValue(id, value);
    };
  }

  handleCheckboxChange(id) {
    return event => {
      const {checked} = event.target;
      this.props.setFieldValue(id, checked.toString());
    };
  }

  handleSaveSettings(event) {
    event.preventDefault();

    const {fields, saveSettings, router, loadSettings, changeTimeFormat} = this.props;

    saveSettings(fields)
      .then(result => {
        loadSettings();
        setTimeFormat(result.value.data, changeTimeFormat);
        toastr.success('Settings updated.');
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting update settings.'));
  }

  handleCancelSettings() {
    const {loadSettings, router} = this.props;
    loadSettings()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the system settings.'));
  }

  handleColorSelected(color) {
    this.props.selectBackgroundColor(color.hex);
  }

  handleSaveColor() {
    const {saveBackgroundColor, color, router} = this.props;
    saveBackgroundColor(color)
      .then(() => toastr.success('Color saved.'))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to save the background color.'));
  }

  handleResetSiteClick() {
    const {resetSite, router} = this.props;
    resetSite()
      .then(() => toastr.success('Site reset initiated. This can take up to a minute to complete.'))
      .catch(error => handleApiError(error, router, 'An error occured while attempting to reset the site.'));
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;
    pollBackgroundJobs([LOCATIONS_STANDARDS, CALCULATE_LABOR]);
  }

  render() {
    const {
      loading,
      saving,
      color,
      pristineColor,
      fields,
      validationErrors,
      isPrestine,
      settingsVersion,
      handleCancelChangeColor,
      handleLaborCalculationClick,
      laborCalculationDisabled,
      hasAdminUsersPermissions,
      hasTrainingParticipantPermissions,
      resetSiteButtonVisible,
      confirmResetModalVisible,
      showConfirmResetModal,
      hideConfirmResetModal,
      resetModalProcessing,
    } = this.props;

    const styles = {
      color: {
        background: pristineColor,
      },
    };
    const logo = `${process.env.API_BASE_URL}logo?version=${settingsVersion}`;

    const isColorUnchanged = (color === pristineColor);

    return (
      <Page pageClassName="admin-tools-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Admin Tools</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.ADMIN} />
          <MainContent loading={loading}>
            <h2>Branding</h2>
            <div className="settings-row">
              <AdminToolsPhotoDropzone onFileSelected={this.handleFileSelected} />
              <AdminToolsColorPicker
                disabled={saving || isColorUnchanged}
                color={color}
                onColorSelected={this.handleColorSelected}
                onCancel={handleCancelChangeColor}
                onSave={this.handleSaveColor} />
              <div className="current settings-column">
                <img src={logo} />
                <div className="logo">Current Logo</div>
                <div style={styles.color} className="background-color" />
                Current Color
              </div>
            </div>
            <div className="settings-row">
              <AdminToolsFields
                disabled={saving}
                fields={fields}
                isPrestine={isPrestine}
                onSave={this.handleSaveSettings}
                onCancel={this.handleCancelSettings}
                onFieldChange={this.handleFieldChange}
                onCheckboxChange={this.handleCheckboxChange}
                formValidationErrors={validationErrors} />
            </div>
            <AdminToolsActions
              calculationInProgress={laborCalculationDisabled}
              hasAdminUsersPermissions={hasAdminUsersPermissions}
              hasTrainingParticipantPermissions={hasTrainingParticipantPermissions}
              handleLaborCalculationClick={handleLaborCalculationClick}
              resetSiteButtonVisible={resetSiteButtonVisible}
              onHandleResetSiteClick={this.handleResetSiteClick}
              confirmResetModalVisible={confirmResetModalVisible}
              showConfirmResetModal={showConfirmResetModal}
              hideConfirmResetModal={hideConfirmResetModal}
              resetModalProcessing={resetModalProcessing} />
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

AdminToolsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  pristineColor: PropTypes.string.isRequired,
  fields: PropTypes.instanceOf(Map),
  validationErrors: PropTypes.instanceOf(Map),
  settingsVersion: PropTypes.number.isRequired,
  isPrestine: PropTypes.bool.isRequired,
  handleCancelChangeColor: PropTypes.func.isRequired,
  loadBrand: PropTypes.func.isRequired,
  loadSettings: PropTypes.func.isRequired,
  saveBackgroundColor: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  selectBackgroundColor: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  uploadClientPhoto: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const hasAdminUsersSelector = makeCurrentUserHasPermissionSelector(ADMIN_USERS);
  const hasTrainingParticipantSelector = makeCurrentUserHasPermissionSelector(TRAINING_PARTICIPANT);

  return {
    loading: loadingSelector(state),
    saving: savingSelector(state),
    color: colorSelector(state),
    pristineColor: pristineColorSelector(state),
    fields: fieldsSelector(state),
    validationErrors: validationErrorsSelector(state),
    settingsVersion: settingsVersionSelector(state),
    isPrestine: isPrestineSelector(state),
    laborCalculationDisabled: laborCalculationDisabledSelector(state),
    hasAdminUsersPermissions: hasAdminUsersSelector(state),
    hasTrainingParticipantPermissions: hasTrainingParticipantSelector(state),
    resetSiteButtonVisible: configurationResetSiteSelector(state),
    confirmResetModalVisible: confirmResetModalVisibleSelector(state),
    resetModalProcessing: modalSavingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadBrand,
    loadSettings,
    uploadClientPhoto,
    selectBackgroundColor,
    saveBackgroundColor,
    setFieldValue,
    saveSettings,
    handleCancelChangeColor: cancelChangeBackgroundColor,
    pollBackgroundJobs,
    handleLaborCalculationClick: triggerLaborCalculation,
    resetSite,
    showConfirmResetModal,
    hideConfirmResetModal,
    changeTimeFormat,
  }
)(AdminToolsPage));
