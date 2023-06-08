import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportLaborCategoriesValidationErrors} from '../actions';
import {
  showSelector,
  createRecordCountSelector,
  totalRecordCountSelector,
  skippedRecordCountSelector,
  validationErrorSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';
import {PropTypes} from 'prop-types';

class ImportLaborCategoriesValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, skippedRecordCount} = this.props;

    this.props.toggleImportLaborCategoriesValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Labor Categor${(createdRecordCount === 1) ? 'y has' : 'ies have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Labor Categor${(skippedRecordCount === 1) ? 'y has' : 'ies have'} been skipped.`;

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
ImportLaborCategoriesValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  createdRecordCount: PropTypes.number,
  totalRecordCount: PropTypes.number,
  skippedRecordCount: PropTypes.number,
  validationErrors: PropTypes.object.isRequired,
  // Actions
  toggleImportLaborCategoriesValidationErrors: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    show: showSelector(state),
    createdRecordCount: createRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    skippedRecordCount: skippedRecordCountSelector(state),
    validationErrors: validationErrorSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    toggleImportLaborCategoriesValidationErrors,
  }
)(ImportLaborCategoriesValidationErrorsModal);
