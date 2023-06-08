import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportVolumeDriverMappings,
  importVolumeDriverMappings,
  showImportVolumeDriverMappingsValidationErrors,
  loadVolumeDriverMappingSetSelectListOptions,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {selectedDepartmentIdSelector} from '../selectors/pages/list';

class ImportVolumeDriverMappingsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount, backgroundedJob}) {
    if (backgroundedJob) {
      toastr.info('File too large to process immediately.  You will receive an email when it has completed.', 'Import Results');
      return;
    }
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Mapping${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Volume Driver Mapping${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;
    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importVolumeDriverMappings,
      showImportVolumeDriverMappingsValidationErrors,
      loadVolumeDriverMappingSetSelectListOptions,
      selectedDepartmentId,
      reloadVolumeDriverMappings,
    } = this.props;

    importVolumeDriverMappings(selectedDepartmentId, file[0])
      .then(response => {
        loadVolumeDriverMappingSetSelectListOptions();
        reloadVolumeDriverMappings();
        if (Object.keys(response.value.data.validationErrors).length > 0) showImportVolumeDriverMappingsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Volume Driver Mappings CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Volume Driver Mappings</h4>
        <p>
          Drop a Volume Driver Mappings .CSV file here or click to browse.
          Existing Volume Driver Mappings will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Volume Driver Mappings"
        faIcon="fa-cubes"
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
    selectedDepartmentId: selectedDepartmentIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportVolumeDriverMappings,
    importVolumeDriverMappings,
    showImportVolumeDriverMappingsValidationErrors,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(ImportVolumeDriverMappingsModal));
