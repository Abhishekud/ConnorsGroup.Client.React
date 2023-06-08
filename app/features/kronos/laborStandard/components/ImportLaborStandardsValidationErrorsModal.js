import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportLaborStandardsValidationErrors} from '../actions';
import {
  showSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../../shared/services';
import ImportFileValidationErrorsModal from '../../../shared/components/ImportFileValidationErrorsModal';

class ImportLaborStandardsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    this.props.closeImportLaborStandardsValidationErrors();

    toastr.success('The Kronos Labor Standards import job is running. You will receive an email with the results.', 'Import Results');
  }

  render() {
    const {show, validationErrors} = this.props;
    return (
      <ImportFileValidationErrorsModal
        show={show}
        validationErrors={validationErrors}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportLaborStandardsValidationErrors,
  }
)(ImportLaborStandardsValidationErrorsModal);
