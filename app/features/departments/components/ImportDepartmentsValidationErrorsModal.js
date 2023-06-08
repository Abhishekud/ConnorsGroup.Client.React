import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportDepartmentsValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  totalRecordCountSelector,
  skippedRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';
import {PropTypes} from 'prop-types';

class ImportDepartmentsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, skippedRecordCount} = this.props;

    this.props.toggleImportDepartmentsValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Department${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Department${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
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

ImportDepartmentsValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  createdRecordCount: PropTypes.number,
  totalRecordCount: PropTypes.number,
  skippedRecordCount: PropTypes.number,
  validationErrors: PropTypes.object.isRequired,

  // Actions
  toggleImportDepartmentsValidationErrors: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    show: showSelector(state),
    createdRecordCount: createdRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    skippedRecordCount: skippedRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    toggleImportDepartmentsValidationErrors,
  }
)(ImportDepartmentsValidationErrorsModal);
