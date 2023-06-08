import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportVolumeDriverValueSetsValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  skippedRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportVolumeDriverValueSetsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount, skippedRecordCount, toggleImportVolumeDriverValueSetsValidationErrors} = this.props;

    toggleImportVolumeDriverValueSetsValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Value Set${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Volume Driver Value Set${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;
    const skippedMsg = `${skippedRecordCount} Volume Driver Value Set${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg} ${skippedMsg}`, 'Import Results');
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
    skippedRecordCount: skippedRecordCountSelector(state),
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    toggleImportVolumeDriverValueSetsValidationErrors,
  }
)(ImportVolumeDriverValueSetsValidationErrorsModal);
