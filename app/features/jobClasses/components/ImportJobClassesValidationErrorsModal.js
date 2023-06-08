import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportJobClassesValidationErrors} from '../actions';
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

class ImportJobClassesValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, skippedRecordCount} = this.props;

    this.props.toggleImportJobClassesValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Job Class${(createdRecordCount === 1) ? ' has' : 'es have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Job Class${(skippedRecordCount === 1) ? ' has' : 'es have'} been skipped.`;

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

ImportJobClassesValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  createdRecordCount: PropTypes.number,
  totalRecordCount: PropTypes.number,
  skippedRecordCount: PropTypes.number,
  validationErrors: PropTypes.array.isRequired,

  // Actions
  toggleImportJobClassesValidationErrors: PropTypes.func.isRequired,
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
    toggleImportJobClassesValidationErrors,
  }
)(ImportJobClassesValidationErrorsModal);
