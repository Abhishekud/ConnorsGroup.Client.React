import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportUsersValidationErrorsModal} from '../actions';
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
import {Map} from 'immutable';

class ImportUsersValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, totalRecordCount, skippedRecordCount, closeImportUsersValidationErrorsModal} = this.props;

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} new user${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const skippedMsg = `${skippedRecordCount} user${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    closeImportUsersValidationErrorsModal();

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
    closeImportUsersValidationErrorsModal,
  }
)(ImportUsersValidationErrorsModal);

ImportUsersValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  totalRecordCount: PropTypes.number.isRequired,
  createdRecordCount: PropTypes.number.isRequired,
  skippedRecordCount: PropTypes.number.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  closeImportUsersValidationErrorsModal: PropTypes.func.isRequired,
};
