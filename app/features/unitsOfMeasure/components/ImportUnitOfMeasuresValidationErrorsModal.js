import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {toggleImportUnitOfMeasuresValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
  skippedRecordCountSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';
import {PropTypes} from 'prop-types';

class ImportUnitOfMeasuresValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, skippedRecordCount} = this.props;

    this.props.toggleImportUnitOfMeasuresValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Unit${(createdRecordCount === 1) ? '' : 's'} of Measure${(createdRecordCount === 1) ? ' has' : ' have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Unit${(skippedRecordCount === 1) ? '' : 's'} of Measure${(skippedRecordCount === 1) ? ' has' : ' have'} been skipped.`;

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

ImportUnitOfMeasuresValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  createdRecordCount: PropTypes.number,
  totalRecordCount: PropTypes.number,
  skippedRecordCount: PropTypes.number,
  validationErrors: PropTypes.object.isRequired,
  // Actions
  toggleImportUnitOfMeasuresValidationErrors: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    show: showSelector(state),
    createdRecordCount: createdRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
    skippedRecordCount: skippedRecordCountSelector(state),

  };
}

export default connect(
  mapStateToProps,
  {
    toggleImportUnitOfMeasuresValidationErrors,
  }
)(ImportUnitOfMeasuresValidationErrorsModal);
