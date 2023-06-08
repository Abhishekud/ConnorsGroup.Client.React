import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportVolumeDrivers,
  importVolumeDrivers,
  loadVolumeDriversList,
  showImportVolumeDriversValidationErrors,
  loadVolumeDriverSelectListOptions,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportVolumeDriversModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({successfulRecordCount, totalRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const successMsg = `${successfulRecordCount} Volume Driver${(successfulRecordCount === 1) ? ' has' : 's have'} been added.`;

    toastr.success(`${processedMsg} ${successMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importVolumeDrivers,
      loadVolumeDriversList,
      loadVolumeDriverSelectListOptions,
      showImportVolumeDriversValidationErrors,
    } = this.props;

    importVolumeDrivers(file[0])
      .then(response => {
        loadVolumeDriverSelectListOptions();

        loadVolumeDriversList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Drivers list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportVolumeDriversValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Volume Drivers CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Volume Drivers</h4>
        <p>
          Drop a Volume Drivers .CSV file here or click to browse.
          Only new Volume Drivers will be created.
          Existing Volume Driver records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Volume Drivers"
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
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportVolumeDrivers,
    importVolumeDrivers,
    loadVolumeDriversList,
    showImportVolumeDriversValidationErrors,
    loadVolumeDriverSelectListOptions,
  }
)(ImportVolumeDriversModal));
