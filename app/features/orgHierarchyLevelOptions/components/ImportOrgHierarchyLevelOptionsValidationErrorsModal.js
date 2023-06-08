import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportOrgHierarchyLevelOptionsValidationErrors} from '../actions';
import {
  showSelector,
  successfulRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportOrgHierarchyLevelOptionsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {successfulRecordCount, totalRecordCount} = this.props;

    this.props.closeImportOrgHierarchyLevelOptionsValidationErrors();

    const processedMsg = (totalRecordCount === 1) ? 'record was' : 'records were';
    const locationMsg = (successfulRecordCount === 1) ? 'Org Hierarchy Level Option has' : 'Org Hierarchy Level Options have';

    toastr.success(`${totalRecordCount} ${processedMsg} processed. ${successfulRecordCount} new ${locationMsg} been added.`, 'Import Results');
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
    successfulRecordCount: successfulRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportOrgHierarchyLevelOptionsValidationErrors,
  }
)(ImportOrgHierarchyLevelOptionsValidationErrorsModal);
