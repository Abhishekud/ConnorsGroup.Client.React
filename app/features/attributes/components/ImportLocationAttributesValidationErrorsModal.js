import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import pluralize from 'pluralize';
import {closeImportLocationAttributesValidationErrors} from '../actions';
import {
  showSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importLocationAttributesValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';
import {locationNameSelector} from '../../shared/selectors/components/settings';

class ImportLocationAttributesValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {updatedRecordCount, totalRecordCount, locationName} = this.props;

    this.props.closeImportLocationAttributesValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${locationName} has` : `${pluralize(locationName)} have`} been updated.`;

    toastr.success(`${processedMsg} ${updatedMsg}`, 'Import Results');
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
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportLocationAttributesValidationErrors,
  }
)(ImportLocationAttributesValidationErrorsModal);
