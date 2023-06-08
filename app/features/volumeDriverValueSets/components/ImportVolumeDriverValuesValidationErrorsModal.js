import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportVolumeDriverValuesValidationErrors} from '../actions';
import {
  showImportVolumeDriverValuesValidationErrorsSelector,
  createdRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importVolumeDriverValuesValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportVolumeDriverValuesValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, toggleImportVolumeDriverValuesValidationErrors} = this.props;

    toggleImportVolumeDriverValuesValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Value${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;

    toastr.success(`${processedMsg} ${createdMsg}`, 'Import Results');
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
    show: showImportVolumeDriverValuesValidationErrorsSelector(state),
    createdRecordCount: createdRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    toggleImportVolumeDriverValuesValidationErrors,
  }
)(ImportVolumeDriverValuesValidationErrorsModal);
