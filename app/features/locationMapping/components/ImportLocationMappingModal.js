import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {PropTypes} from 'prop-types';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportLocationMapping,
  importLocationMapping,
  loadLocationMappingList,
  showImportLocationMappingValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/importLocationMapping';
import {
  locationNameSelector,
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {
  selectedDepartmentIdSelector,
} from '../selectors/pages/locationMappingList';

class ImportLocationMappingModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, deletedRecordCount, skippedRecordCount, totalRecordCount}) {
    const {locationName, departmentName} = this.props;

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const pluralLocationName = pluralize(locationName);
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been updated.`;
    const deletedMsg = `${deletedRecordCount} ${(deletedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been deleted.`;
    const skippedMsg = `${skippedRecordCount} ${(skippedRecordCount === 1) ? `${departmentName} ${locationName} has` : `${departmentName} ${pluralLocationName} have`} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg} ${skippedMsg} ${deletedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      locationName,
      selectedDepartmentId,
      router,
      importLocationMapping,
      loadLocationMappingList,
      showImportLocationMappingValidationErrors,
    } = this.props;

    importLocationMapping(file[0])
      .then(response => {
        loadLocationMappingList(selectedDepartmentId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(locationName)} list.`, 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportLocationMappingValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to import the ${pluralize(locationName)} CSV file.`, 'Error'));
  }

  render() {
    const {show, handleCancel, importing, locationName} = this.props;

    const modalBody =
      <div>
        <h4>Add new {locationName} Mapping</h4>
        <p>
          Drop a {locationName} Mapping .CSV file here or click to browse.
          New {locationName} Mappings will be created.
          Existing {locationName} Mapping records will be updated.
          Unchecked {locationName} Mapping records will be deleted.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={`Import ${locationName} Mapping`}
        faIcon="fa-building-o"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    importing: importingSelector(state),
    locationName: locationNameSelector(state),
    departmentName: departmentNameSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportLocationMapping,
    importLocationMapping,
    loadLocationMappingList,
    showImportLocationMappingValidationErrors,
  }
)(ImportLocationMappingModal));

ImportLocationMappingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,
  locationName: PropTypes.string.isRequired,
  departmentName: PropTypes.string.isRequired,
  selectedDepartmentId: PropTypes.number,
  handleCancel: PropTypes.func.isRequired,
  importLocationMapping: PropTypes.func.isRequired,
  loadLocationMappingList: PropTypes.func.isRequired,
  showImportLocationMappingValidationErrors: PropTypes.func.isRequired,
};
