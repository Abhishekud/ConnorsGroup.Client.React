import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportTaskGroupsValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../../shared/services';
import ImportFileValidationErrorsModal from '../../../shared/components/ImportFileValidationErrorsModal';

class ImportTaskGroupsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount} = this.props;

    this.props.closeImportTaskGroupsValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? 'Kronos Task Group has' : 'Kronos Task Groups have'} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? 'Kronos Task Group has' : 'Kronos Task Groups have'} been updated.`;

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
    closeImportTaskGroupsValidationErrors,
  }
)(ImportTaskGroupsValidationErrorsModal);
