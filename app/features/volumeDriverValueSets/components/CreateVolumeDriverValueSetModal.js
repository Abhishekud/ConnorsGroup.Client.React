import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CreateEditModal} from '../../shared/components';
import CreateEditVolumeDriverValueSetForm from './CreateEditVolumeDriverValueSetForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  showConfirmDefaultSelector,
} from '../selectors/modals/create';
import {
  cancelCreateVolumeDriverValueSet,
  createVolumeDriverValueSet,
  setCreateVolumeDriverValueSetModelProperty,
  loadVolumeDriverValueSetsList,
  toggleConfirmDefaultVolumeDriverValueSet,
  toggleImportVolumeDriverValuesValidationErrors,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import ConfirmDefaultVolumeDriverValueSet from './ConfirmDefaultVolumeDriverValueSet';

class CreateVolumeDriverValueSetModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    this.createEditVolumeDriverValueSetFormRef = React.createRef();
  }

  showToastrImportMessage({createdRecordCount, totalRecordCount, backgroundedJob}) {
    if (backgroundedJob) {
      toastr.info('File too large to process immediately.  You will receive an email when it has completed.  ' +
      'If the volume driver value set is created as default, it will be marked as default once the file process is completed.', 'Import Results');
      return;
    }
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Value${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;

    toastr.success(`${processedMsg} ${createdMsg}`, 'Import Results');
  }

  handleCreateVolumeDriverValueSet() {
    const {createVolumeDriverValueSet, model, router, loadVolumeDriverValueSetsList, handleCancel, toggleImportVolumeDriverValuesValidationErrors} = this.props;
    const volumeDriveValuesFile = this.createEditVolumeDriverValueSetFormRef.current.file.files[0];
    createVolumeDriverValueSet(model, volumeDriveValuesFile)
      .then(response => {
        if (Object.keys(response.value.data.importVolumeDriverValuesResponse.validationErrors).length > 0) toggleImportVolumeDriverValuesValidationErrors();
        else this.showToastrImportMessage(response.value.data.importVolumeDriverValuesResponse);
        loadVolumeDriverValueSetsList();
      })
      .catch(error => {
        const {status} = error.response || {};
        let errorMessage = 'An error occurred while attempting to add this Volume Driver Value Set.';
        if (status === 400 && this.props.validationErrors.get('_')) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          handleCancel();
          return;
        } else if (status === 412) {
          loadVolumeDriverValueSetsList();
          errorMessage = error.response.data.message;
        }
        handleApiError(error, router, errorMessage, 'Error');
        if (!error.response.status) throw error;
      });
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    let message = '';
    const setNameContainsDefault = (name === 'name' ? value.match(/\(Default\)/i) : null);
    if (setNameContainsDefault) {
      message = `Volume driver value set name can not include '${_.first(setNameContainsDefault)}' word.`;
    }

    this.props.setCreateVolumeDriverValueSetModelProperty(name, value, message);
  }

  handleConfirm() {
    this.handleCreateVolumeDriverValueSet();
    this.props.toggleConfirmDefaultVolumeDriverValueSet();
  }

  handleSave(event) {
    event.preventDefault();
    if (this.props.model.get('isDefault')) {
      this.props.toggleConfirmDefaultVolumeDriverValueSet();
    } else {
      this.handleCreateVolumeDriverValueSet();
    }

  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, showConfirmDefault, toggleConfirmDefaultVolumeDriverValueSet} = this.props;

    const form =
      <CreateEditVolumeDriverValueSetForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        createEditVolumeDriverValueSetFormRef={this.createEditVolumeDriverValueSetFormRef}
        model={model} />;

    const message = (
      <span>
        Are you sure you want this VDV Set as <b>Default</b>?
      </span>
    );

    return (
      <>
        <ConfirmDefaultVolumeDriverValueSet
          show={showConfirmDefault}
          message={message}
          saving={saving}
          onCancel={toggleConfirmDefaultVolumeDriverValueSet}
          onConfirm={this.handleConfirm} />

        <CreateEditModal
          show={show}
          saving={saving}
          title="New Volume Driver Value Set"
          form={form}
          onCancel={handleCancel}
          onSave={this.handleSave} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    showConfirmDefault: showConfirmDefaultSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateVolumeDriverValueSet,
    setCreateVolumeDriverValueSetModelProperty,
    createVolumeDriverValueSet,
    loadVolumeDriverValueSetsList,
    toggleConfirmDefaultVolumeDriverValueSet,
    toggleImportVolumeDriverValuesValidationErrors,
  }
)(CreateVolumeDriverValueSetModal));
