import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportLocationsValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import {locationNameSelector} from '../../shared/selectors/components/settings';
import {toastr} from '../../shared/services';
import pluralize from 'pluralize';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportLocationsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount, locationName} = this.props;

    this.props.closeImportLocationsValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? `${locationName} has` : `${pluralize(locationName)} have`} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${locationName} has` : `${pluralize(locationName)} have`} been updated.`;

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
    locationName: locationNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportLocationsValidationErrors,
  }
)(ImportLocationsValidationErrorsModal);
