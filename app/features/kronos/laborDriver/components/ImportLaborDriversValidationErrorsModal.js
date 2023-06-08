import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportLaborDriversValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../../shared/services';
import ImportFileValidationErrorsModal from '../../../shared/components/ImportFileValidationErrorsModal';

class ImportLaborDriversValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount} = this.props;

    this.props.closeImportLaborDriversValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Kronos Labor Driver${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Kronos Labor Driver${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
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
    createdRecordCount: createdRecordCountSelector(state),
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportLaborDriversValidationErrors,
  }
)(ImportLaborDriversValidationErrorsModal);
