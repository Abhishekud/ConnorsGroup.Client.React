import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {closeImportLocationMappingValidationErrors} from '../actions';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  deletedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
  skippedRecordCountSelector,
} from '../selectors/modals/importLocationMappingValidationErrors';
import {
  locationNameSelector,
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {toastr} from '../../shared/services';
import pluralize from 'pluralize';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';

class ImportLocationMappingValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {createdRecordCount, updatedRecordCount, deletedRecordCount, totalRecordCount, skippedRecordCount, locationName, departmentName} = this.props;

    this.props.closeImportLocationMappingValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const pluralLocationName = pluralize(locationName);
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been updated.`;
    const deletedMsg = `${deletedRecordCount} ${(deletedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been deleted.`;
    const skippedMsg = `${skippedRecordCount} ${(skippedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg} ${skippedMsg} ${deletedMsg}`, 'Import Results');
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
    deletedRecordCount: deletedRecordCountSelector(state),
    skippedRecordCount: skippedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
    departmentName: departmentNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportLocationMappingValidationErrors,
  }
)(ImportLocationMappingValidationErrorsModal);


ImportLocationMappingValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  createdRecordCount: PropTypes.number,
  updatedRecordCount: PropTypes.number,
  deletedRecordCount: PropTypes.number,
  skippedRecordCount: PropTypes.number,
  totalRecordCount: PropTypes.number,
  validationErrors: PropTypes.object,
  locationName: PropTypes.string.isRequired,
  departmentName: PropTypes.string.isRequired,
  closeImportLocationMappingValidationErrors: PropTypes.func.isRequired,
};
