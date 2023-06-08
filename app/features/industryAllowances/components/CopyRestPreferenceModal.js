import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import CancelButton from './CancelButton';
import {Button, Modal} from 'react-bootstrap';
import CreateCopyRestPreferenceRequest from './CreateCopyRestPreferenceRequest';
import React, {PureComponent} from 'react';
import {handleApiError, toastr} from '../../shared/services';
import pluralize from 'pluralize';
import {showSelector, savingSelector, modelSelector, validationErrorsSelector, duplicateRestAllowancesSelector} from '../selectors/modals/copyRestPreference';
import {selectedIndustryAllowancesSelector, selectedIndustrySourceIdSelector} from '../selectors/pages/list';
import {
  cancelCopyRestPreference,
  addIndustryAllowancesToClient,
  setCopyRestPreferenceRequest,
} from '../actions';
import {withRouter} from 'react-router';
import ConflictingIndustryAllowancesRestList from './ConflictingIndustryAllowancesRestList';
import {loadAllowancesList} from '../../allowances/actions';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {ALLOWANCE_RESTS} from '../../selectListOptions/constants/selectListTypes';

class CopyRestPreferenceModal extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setCopyRestPreferenceRequest(name, value);
  }

  handleSave(e) {
    e.preventDefault();
    const {addIndustryAllowancesToClient, selectedIndustrySourceId, selectedIndustryAllowances, model, loadAllowancesList, loadSelectListOptions} = this.props;

    addIndustryAllowancesToClient(selectedIndustryAllowances.valueSeq().map(e => e.get('id')), selectedIndustrySourceId, model.get('createCopyRestOptions'))
      .then(response => {
        const responseData = response.value.data;

        loadAllowancesList();
        loadSelectListOptions(ALLOWANCE_RESTS);
        if (responseData.addedRecordCount) toastr.success(`${responseData.addedRecordCount} Industry ${pluralize('Allowance', responseData.addedRecordCount)} added.`);
        if (responseData.backgrounded) toastr.warning('Import job created.  You will receive an email after it completes.');
        if (responseData.skipped) toastr.warning(`${responseData.skipped} Industry ${pluralize('Allowance', responseData.skipped)} skipped.`);
      })
      .catch(error => {
        const {router} = this.props;
        handleApiError(error, router, 'An error occurred while attempting to add Industry Allowances', 'Error');
      });
  }

  render() {
    const {show, model, validationErrors, saving, handleCancel, duplicateRestAllowances} = this.props;

    return (
      <Modal show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>Copy Allowances</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          One or more allowances reference rest calculations that exists in the target site.
          How would you like to proceed?

          <ConflictingIndustryAllowancesRestList duplicateRestAllowances={duplicateRestAllowances} />
          <CreateCopyRestPreferenceRequest
            saving={saving}
            model={model}
            validationErrors={validationErrors}
            onSubmit={this.handleSave}
            onFieldChange={this.handleFieldChange} />
        </Modal.Body>
        <Modal.Footer>
          <CancelButton onClick={handleCancel} disabled={saving} />
          <Button bsStyle="primary" disabled={saving || model.get('createCopyRestOptions') === null} onClick={this.handleSave}>{saving ? 'Processing...' : 'Continue'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    selectedIndustryAllowances: selectedIndustryAllowancesSelector(state),
    selectedIndustrySourceId: selectedIndustrySourceIdSelector(state),
    duplicateRestAllowances: duplicateRestAllowancesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCopyRestPreference,
    addIndustryAllowancesToClient,
    setCopyRestPreferenceRequest,
    loadAllowancesList,
    loadSelectListOptions,
  }
)(CopyRestPreferenceModal));
