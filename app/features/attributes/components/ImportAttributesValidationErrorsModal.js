import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportAttributesValidationErrors} from '../actions';
import {
  showSelector,
  successfulRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportAttributesValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {successfulRecordCount, totalRecordCount} = this.props;

    this.props.closeImportAttributesValidationErrors();

    const processedMsg = (totalRecordCount === 1) ? 'record was' : 'records were';
    const locationMsg = (totalRecordCount === 1) ? 'Attribute has' : 'Attributes have';

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
    closeImportAttributesValidationErrors,
  }
)(ImportAttributesValidationErrorsModal);
