import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportVolumeDriverValues,
  importVolumeDriverValues,
  getVolumeDriverValues,
  showVolumeDriverValuesImportValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {selectedVolumeDriverValueSetIdSelector} from '../selectors/pages/list';

class ImportVolumeDriverValuesModal extends Component {
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
    const createdMsg = `${createdRecordCount} Volume Driver Value${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Volume Driver Value${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importVolumeDriverValues,
      getVolumeDriverValues,
      showVolumeDriverValuesImportValidationErrors,
      selectedVolumeDriverValueSetId,
    } = this.props;

    importVolumeDriverValues(file[0])
      .then(response => {
        getVolumeDriverValues(selectedVolumeDriverValueSetId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Values list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showVolumeDriverValuesImportValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => {
        let errorMessage = 'An error occurred while attempting to import the Volume Driver Values CSV file.';
        if (error.response.status === 412) {
          errorMessage = error.response.data.message;
        }
        handleApiError(error, router, errorMessage, 'Error');
      });
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Volume Driver Values</h4>
        <p>
          Drop a Volume Driver Values .CSV file here or click to browse.
          This will reset all Volume Driver Values.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Volume Driver Values"
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
    selectedVolumeDriverValueSetId: selectedVolumeDriverValueSetIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportVolumeDriverValues,
    importVolumeDriverValues,
    getVolumeDriverValues,
    showVolumeDriverValuesImportValidationErrors,
  }
)(ImportVolumeDriverValuesModal));
